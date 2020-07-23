import React from "react";
import {
  PostOverviewProps,
  PostListProps,
  PostProps,
} from "components/Post/PostProp";

import { Tag, Icon, Colors } from "@blueprintjs/core";
import { Link } from "react-router-dom";

export const PostOverview = ({ post }: { post: PostOverviewProps }) => {
  return (
    <div className="post-card">
      <div className="post-content">
        <Link to={`/post/${post.id}`}>
          <h4 className="bp3-heading post-header">
            {post.subject}{" "}
            {post.tags &&
              post.tags.map((u) => (
                <Tag className="tag-item" key={u}>
                  {u}
                </Tag>
              ))}
          </h4>
        </Link>
        {post.imageURL && <img src={post.imageURL} style={{ width: "100%" }} />}
        <div style={{ display: "flex" }}>
          <div style={{ flexGrow: 1 }}>
            <Icon icon="comment" color={Colors.GRAY5} /> <b>14</b> {"  "}{" "}
            <Icon icon="eye-open" color={Colors.GRAY5} /> <b>2122</b>
            {"  "}
            <Icon icon="heart" color={Colors.GRAY5} /> <b>1</b>
          </div>
          <i className="post-meta">
            {post.createdBy} -{" "}
            {new Date(post.createdAt).toLocaleDateString("vi-VN")}
          </i>
        </div>
      </div>
    </div>
  );
};

export const PostList = (props: PostListProps) => {
  return (
    <div className="post-container">
      {props.posts.map((u) => (
        <PostOverview
          key={u.id}
          post={{
            ...u,
            imageURL: props.showImage ? u.imageURL : undefined,
            tags: props.showTag ? u.tags : undefined,
          }}
        />
      ))}
    </div>
  );
};

export const PostDetail = (post: PostProps) => {
  return (
    <div className="post-card">
      <h4 className="bp3-heading post-header">
        {post.subject}{" "}
        {post.tags &&
          post.tags.map((u) => (
            <Tag className="tag-item" key={u}>
              {u}
            </Tag>
          ))}
      </h4>
      {post.content}
      <i className="post-meta">
        {post.createdBy} -{" "}
        {new Date(post.createdAt).toLocaleDateString("vi-VN")}
      </i>
    </div>
  );
};