import React, { useState, ChangeEvent } from "react";
import { InputGroup, Button, ControlGroup, Tag } from "@blueprintjs/core";
import { tagAPI } from "resources/api/tag";
import { TagProp } from "./TagProp";

export const TagCreate = () => {
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState<TagProp[]>([]);
  const loadTags = (search: string) => {
    tagAPI.get(search).then((tags) => setTags(tags));
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    loadTags(value);
    setTag(value);
  };

  const handleSave = () => {
    tagAPI
      .put(tag)
      .then(() => {
        alert("Save");
        setTag("");
        loadTags("");
      })
      .catch((err) => alert(err.message));
  };
  return (
    <>
      <h2>Thêm tag mới</h2>
      <hr />
      <ControlGroup fill={true} vertical={false}>
        <InputGroup
          placeholder="Tiêu đề"
          value={tag}
          name="tag"
          onChange={handleChange}
        />
        <Button
          icon="floppy-disk"
          intent="success"
          onClick={handleSave}
        ></Button>
      </ControlGroup>
      <hr />
      <div>
        {tags.map((tag) => (
          <Tag large key={tag.value}>
            {tag.value}
          </Tag>
        ))}
      </div>
    </>
  );
};