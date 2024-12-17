import React from "react";
import projects from "../../_mock/mockProject";

const ViewProject = () => {
  return (
    <div className="bg-black w-screen text-white py-12 lg:py-0 lg:pb-[9rem] md:pb-[8rem]">
      <h1 className="text-center mt-[3rem] uppercase lg:mt-11 font-semibold lg:text-2xl">
        my collection
      </h1>
      {projects.map((project, index) => {
        return (
          <div
            key={index}
          className={`w-full mt-[5rem] flex flex-col lg:flex-row ${index % 2!=  0 ? "lg:flex-row-reverse lg:mt-[15rem]" : "lg:flex-row"}`}
          >
            <div className="h-full w-full px-5  p-5">
              <video
                className="h-1/2 w-full object-center rounded-lg"
                autoPlay
                loop
                muted
                src={project.videoSrc}
              ></video>
            </div>
            <div className="h-1/2 w-full mt-6 px-6 lg:mt-[8rem] ">
              <p className="text-center lg:mb-[3rem] uppercase md:mb-[1rem]">
                {project.title}
              </p>
              <p className="text-white ">{project.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ViewProject;
