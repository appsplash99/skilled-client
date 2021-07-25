import React from "react";
import { Link } from "react-router-dom";
import { Btn } from "morphine-ui";

export const EmptyPlaylistComponent = ({ videosOf }) => {
  return (
    <div className="mt--lg">
      <h3 className="mb--md">Your {videosOf} is empty</h3>
      <Btn shape="capsule" size="md" variant="primary">
        <Link to="/" className="text-decoration--none text--light">
          Watch Videos
        </Link>
      </Btn>
    </div>
  );
};
