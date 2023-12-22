import React from 'react'
import { Skeleton } from './skeleton'

const ProjectHeaderSkeleton = () => {
  return (
    <>
      <Skeleton className="w-[150px] h-[20px] rounded-full" />
      <div className="flex justify-between items-center">
        <div className="flex flex-col space-y-2">
          <Skeleton className="w-[300px] h-[20px] rounded-full" />
          <Skeleton className="w-[500px] h-[20px] rounded-full" />
        </div>
        <div className="flex justify-start items-center gap-3">
          <div className="flex justify-start items-center gap-2">
            <Skeleton className="w-[50px] h-[50px] rounded-full" />
            <Skeleton className="w-[150px] h-[20px] rounded-full" />
          </div>
          <div className="flex justify-start items-center gap-2">
            <Skeleton className="w-[50px] h-[50px] rounded-full" />
            <Skeleton className="w-[150px] h-[20px] rounded-full" />
          </div>
        </div>
      </div>
    </>
  )
}

export default ProjectHeaderSkeleton
