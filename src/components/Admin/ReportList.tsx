import React from "react";
import { ReportAdminContext } from "views/ReportAdmin";
import { Button, ITreeNode, Tree } from "@blueprintjs/core";
import { IReportTemplate } from "resources/report/ReportTemplate";
import { reportAPI } from "resources/report/report";
import { toastError } from "components/Commons/ToasterError";
import { RequestError } from "resources/api/helper";

const newReport: IReportTemplate = {
  alias: "Report",
  title: "New report",
  templateSql: "",
  filterMetas: [],
};

const addNodes = (
  report: IReportTemplate,
  selectedReport: IReportTemplate | undefined,
  parts: string[],
  nodes: ITreeNode[]
) => {
  if (parts.length === 0) return nodes;
  if (parts.length === 1) {
    const any = nodes.filter((u) => u.id === report.id).length > 0;
    if (!any)
      return [
        ...nodes,
        {
          label: parts[0],
          id: report.id,
          isSelected: selectedReport?.id === report.id,
          icon: "document",
        } as ITreeNode,
      ];
    return nodes.map((node) => {
      if (node.id === report.id)
        return {
          ...node,
          label: parts[0],
          isSelected: selectedReport?.id === report.id,
        };
      return node;
    });
  }
  let found = false;
  const newNodes = nodes.map((node) => {
    if (node.label === parts[0]) {
      const childNodes = addNodes(
        report,
        selectedReport,
        parts.filter((_, index) => index > 0),
        node.childNodes ?? []
      ) as ITreeNode[];
      found = true;
      return { ...node, childNodes };
    }
    return node;
  });
  if (found) return newNodes;
  const childNodes = addNodes(
    report,
    selectedReport,
    parts.filter((_, index) => index > 0),
    []
  ) as ITreeNode[];
  return [...nodes, { label: parts[0], id: parts[0], childNodes } as ITreeNode];
};

function updateNode(
  node: ITreeNode,
  list: ITreeNode[],
  nodePath: number[]
): ITreeNode[] {
  if (nodePath.length === 0) return [] as ITreeNode[];
  if (nodePath.length === 1)
    return list.map((item) => {
      if (item.id === node.id) return node;
      return item;
    }) as ITreeNode[];
  return list.map((item) => {
    if (item.id === nodePath[0]) {
      return updateNode(
        node,
        item.childNodes ?? [],
        nodePath.filter((_, index) => index > 0)
      );
    }
    return item;
  }) as ITreeNode[];
}

export const ReportList = () => {
  const { reports, selectedReport, setSelectedReport } = React.useContext(
    ReportAdminContext
  );
  const [treeNodes, setTreeNodes] = React.useState<ITreeNode[]>([]);
  React.useEffect(() => {
    reports?.map((report) => {
      setTreeNodes((treeNodes) => {
        const parts = report.alias
          .split("/")
          .map((p) => p.trim())
          .filter((p) => p !== "");
        return addNodes(report, selectedReport, parts, treeNodes);
      });
    });
  }, [reports, selectedReport]);

  const handleNodeCollapse = (node: ITreeNode, nodePath: number[]) => {
    node.isExpanded = false;
    setTreeNodes(updateNode(node, treeNodes, nodePath));
  };

  const handleNodeExpand = (node: ITreeNode, nodePath: number[]) => {
    node.isExpanded = true;
    setTreeNodes(updateNode(node, treeNodes, nodePath));
  };
  const handleNodeClick = (node: ITreeNode) => {
    if (node.childNodes != null) return;
    reportAPI
      .getTemplate(node.id as number)
      .then((report) => {
        if (report == null) {
          toastError("Không tìm thấy report");
        }
        setSelectedReport && setSelectedReport(report);
      })
      .catch((err: RequestError) => toastError(err.message));
  };
  return (
    <div className="card">
      <div className="card-header align-left">
        <h2>Danh sách report</h2>
        <Button
          icon="add"
          minimal
          intent="primary"
          style={{ marginRight: "2px" }}
          onClick={() => setSelectedReport && setSelectedReport(newReport)}
        ></Button>
      </div>
      <div className="card-content">
        <Tree
          contents={treeNodes}
          onNodeCollapse={handleNodeCollapse}
          onNodeExpand={handleNodeExpand}
          onNodeClick={handleNodeClick}
        />
      </div>
    </div>
  );
};
