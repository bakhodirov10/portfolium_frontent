import React from "react";
import Skeleton from "@mui/material/Skeleton";

const ProjectSkeletonCard: React.FC = () => {
  return (
    <div className="grid grid-cols-3 gap-5">

      <div className="flex justify-between items-start gap-2">
        <Skeleton variant="text" width={130} sx={{ fontSize: "1.2rem" }} />
        <Skeleton variant="rounded" width={60} height={22} />
      </div>

      <div className="flex flex-row gap-1.5">
        <Skeleton variant="text" width="100%" sx={{ fontSize: "0.85rem" }} />
        <Skeleton variant="text" width="100%" sx={{ fontSize: "0.85rem" }} />
        <Skeleton variant="text" width="60%"  sx={{ fontSize: "0.85rem" }} />
      </div>

      <div className="flex gap-2 mt-1">
        <Skeleton variant="rounded" width={50} height={24} />
        <Skeleton variant="rounded" width={50} height={24} />
        <Skeleton variant="rounded" width={50} height={24} />
      </div>

      <div className="border-t border-slate-100 dark:border-slate-800 pt-4 flex justify-between">
        <Skeleton variant="text" width={60} sx={{ fontSize: "0.75rem" }} />
        <Skeleton variant="text" width={80} sx={{ fontSize: "0.75rem" }} />
      </div>

    </div>
  );
};

export default ProjectSkeletonCard;