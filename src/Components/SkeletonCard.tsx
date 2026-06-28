import React from "react";
import Skeleton from "@mui/material/Skeleton";

const SkeletonCard: React.FC = () => {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 flex flex-col gap-5">

      <div className="flex items-center gap-3">
        <Skeleton variant="rounded" width={40} height={40} />
        <div className="flex flex-col gap-1.5">
          <Skeleton variant="text" width={100} sx={{ fontSize: "1.1rem" }} />
          <Skeleton variant="text" width={60} sx={{ fontSize: "0.7rem" }} />
        </div>
      </div>

      <div className="flex justify-between">
        <Skeleton variant="text" width={80} sx={{ fontSize: "0.75rem" }} />
        <Skeleton variant="text" width={30} sx={{ fontSize: "0.75rem" }} />
      </div>

      <Skeleton variant="rounded" width="100%" height={6} />

      <div className="border-t border-slate-100 dark:border-slate-800 pt-3 flex justify-between">
        <Skeleton variant="text" width={60} sx={{ fontSize: "0.7rem" }} />
        <Skeleton variant="text" width={90} sx={{ fontSize: "0.7rem" }} />
      </div>

    </div>
  );
};

export default SkeletonCard;