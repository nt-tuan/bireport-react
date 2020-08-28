import React from "react";
import { ReportAdminContext } from "views/ReportAdmin";
import { Button, ITreeNode, Tree, ButtonGroup } from "@blueprintjs/core";
import { IReportTemplate } from "resources/report/ReportTemplate";
import { escapeRegExp } from "helpers/strings";
import { DeleteReportButton } from "./Buttons/DeleteReportButton";

const addLeaf = (
  report: IReportTemplate,
  selectedReport: IReportTemplate | undefined,
  label: string,
  nodes: ITreeNode[]
) => {
  const any = nodes.filter((u) => u.id === report.id).length > 0;
  if (!any)
    return [
      ...nodes,
      {
        label,
        id: report.id,
        isSelected: selectedReport?.id === report.id,
        icon: "document",
      } as ITreeNode,
    ];
  return nodes.map((node) => {
    if (node.id === report.id)
      return {
        ...node,
        label,
        isSelected: selectedReport?.id === report.id,
      };
    return node;
  });
};

const addNodes = (
  report: IReportTemplate,
  selectedReport: IReportTemplate | undefined,
  parts: string[],
  nodes: ITreeNode[]
): ITreeNode[] => {
  if (parts.length === 0) return nodes;
  const label = parts[0];
  if (parts.length === 1) {
    return addLeaf(report, selectedReport, label, nodes);
  }
  let found = false;
  const newNodes = nodes.map((node) => {
    if (node.label === label) {
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

  const isExpanded: boolean =
    selectedReport?.alias.match(escapeRegExp(label)) != null;
  const childNodes = addNodes(
    report,
    selectedReport,
    parts.filter((_, index) => index > 0),
    []
  );
  return [...nodes, { label, id: label, childNodes, isExpanded } as ITreeNode];
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

const removeNode = (
  nodes: ITreeNode[],
  reports: IReportTemplate[]
): ITreeNode[] => {
  return nodes.reduce((filtered: ITreeNode[], node) => {
    if (!node.childNodes) {
      const any = reports.filter((report) => report.id === node.id);
      if (any.length === 0) return filtered;
      return [...filtered, node];
    }
    return [
      ...filtered,
      { ...node, childNodes: removeNode(node.childNodes, reports) },
    ];
  }, []);
};

const ReportList = () => {
  const { reports, selectedReport, onSelectionChange } = React.useContext(
    ReportAdminContext
  );
  const [treeNodes, setTreeNodes] = React.useState<ITreeNode[]>([]);
  React.useEffect(() => {
    // Remove
    setTreeNodes((nodes) => (reports ? removeNode(nodes, reports) : []));
    // Add
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
    onSelectionChange && onSelectionChange(node.id as number);
  };
  return (
    <Tree
      contents={treeNodes}
      onNodeCollapse={handleNodeCollapse}
      onNodeExpand={handleNodeExpand}
      onNodeClick={handleNodeClick}
    />
  );
};

export const EditableReportList = () => {
  const { onNewReport } = React.useContext(ReportAdminContext);
  return (
    <div className="card">
      <div className="card-header align-left">
        <h2>Danh sách report</h2>
        <div className="card-header-actions">
          <ButtonGroup>
            <Button
              icon="add"
              intent="primary"
              onClick={() => onNewReport && onNewReport()}
            />
            <DeleteReportButton />
          </ButtonGroup>
        </div>
      </div>
      <div className="card-content">
        <ReportList />
      </div>
    </div>
  );
};

export const ReportMenu = () => {
  return (
    <div className="card">
      <div className="card-header align-left">
        <h2>Danh sách report</h2>
      </div>
      <div className="card-content">
        <ReportList />
      </div>
    </div>
  );
};
