import React, { useState, useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import FileBase64 from "react-file-base64";
import './ResumeMaker.css'

const ResumeMaker = () => {
  const [resumeData, setResumeData] = useState({
    name: "",
    about: "",
    address: "",
    phone: "",
    email: "",
    skills: "",
    experience: "",
    education: "",
    image: "",
    projects: [],
    customSections: [],
  });

  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    link: "",
  });

  const [newCustomSection, setNewCustomSection] = useState({
    sectionTitle: "",
    sectionDescription: "",
  });

  const resumeRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setResumeData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = ({ base64 }) => {
    setResumeData((prev) => ({ ...prev, image: base64 }));
  };

  const handleProjectChange = (e) => {
    const { name, value } = e.target;
    setNewProject((prev) => ({ ...prev, [name]: value }));
  };

  const addProject = () => {
    setResumeData((prev) => ({
      ...prev,
      projects: [...prev.projects, newProject],
    }));
    setNewProject({ title: "", description: "", link: "" });
  };

  const handleCustomSectionChange = (e) => {
    const { name, value } = e.target;
    setNewCustomSection((prev) => ({ ...prev, [name]: value }));
  };

  const addCustomSection = () => {
    setResumeData((prev) => ({
      ...prev,
      customSections: [...prev.customSections, newCustomSection],
    }));
    setNewCustomSection({ sectionTitle: "", sectionDescription: "" });
  };

  const downloadPdf = () => {
    const resume = resumeRef.current;

    html2canvas(resume, { scale: 3 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const imgWidth = 210;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save("resume.pdf");
    });
  };

  return (
    <>
    <div className="header">
      <div className="header-content">
      <h1 className="text-3xl font-bold text-center">Resume Maker</h1>
      </div>
    </div>

      <div className="resume-header rounded-lg p-2 ">
        <div className="resume-content gap-4 bg-white shadow-lg p-10 ra">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={resumeData.name}
            onChange={handleChange}
            className="p-2 border rounded w-full mb-2"
          />
          <input
            type="text"
            placeholder="Address"
            name="address"
            value={resumeData.address}
            onChange={handleChange}
            className="p-2 border rounded w-full mb-2"
          />
          <input
            type="text"
            placeholder="Phone"
            name="phone"
            value={resumeData.phone}
            onChange={handleChange}
            className="p-2 border rounded w-full mb-2"
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={resumeData.email}
            onChange={handleChange}
            className="p-2 border rounded w-full mb-2"
          />
          <textarea
            placeholder="About Me"
            name="about"
            value={resumeData.about}
            onChange={handleChange}
            rows={6}
            className="p-2 border rounded col-span-2 w-full"
          ></textarea>
          <textarea
            placeholder="Skills (Separate by new lines)"
            name="skills"
            value={resumeData.skills}
            onChange={handleChange}
            rows={6}
            className="p-2 border rounded col-span-2 w-full"
          ></textarea>
          <textarea
            placeholder="Experience (Separate by new lines)"
            name="experience"
            value={resumeData.experience}
            onChange={handleChange}
            rows={6}
            className="p-2 border rounded col-span-2 w-full"
          ></textarea>
          <textarea
            placeholder="Education (Separate by new lines)"
            name="education"
            value={resumeData.education}
            onChange={handleChange}
            rows={6}
            className="p-2 border rounded col-span-2 w-full"
          ></textarea>
          <div className="col-span-2">
            <FileBase64 multiple={false} onDone={handleImageUpload} />
          </div>
     

        {/* Project Input Fields */}
        <div className="add-content-header">
        <h2 className="add-content text-xl font-bold mt-6">Add Projects</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Project Title"
            name="title"
            value={newProject.title}
            onChange={handleProjectChange}
            className="p-2 border rounded w-full"
          />
          <input
            type="text"
            placeholder="Project Link"
            name="link"
            value={newProject.link}
            onChange={handleProjectChange}
            className="p-2 border rounded w-full"
          />
          <textarea
            placeholder="Project Description"
            name="description"
            value={newProject.description}
            onChange={handleProjectChange}
            rows={4}
            className="p-2 border rounded col-span-2 w-full"
          ></textarea>
        </div>
        <button
          onClick={addProject}
          className="mt-4 bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded"
        >
          Add Project
        </button>

        {/* Custom Section Input Fields */}
        <h2 className="text-xl font-bold mt-6">Add Custom Section</h2>
        <div className=" gap-4">
          <input
            type="text"
            placeholder="Section Title (e.g. Soft Skills, Certifications)"
            name="sectionTitle"
            value={newCustomSection.sectionTitle}
            onChange={handleCustomSectionChange}
            className="p-2 border rounded w-full mb-2"
          />
          <textarea
            placeholder="Section Description"
            name="sectionDescription"
            value={newCustomSection.sectionDescription}
            onChange={handleCustomSectionChange}
            rows={4}
            className="p-2 border rounded col-span-2 w-full"
          ></textarea>
        </div>
        <button
          onClick={addCustomSection}
          className="mt-4 bg-pink-500 hover:pink-600  text-white px-4 py-2 rounded"
        >
          Add Section
        </button>

        <button
          onClick={downloadPdf}
          className="mt-4 ml-4 bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded"
        >
          Download PDF
        </button>
      </div>
      </div>
      </div>
      {/* Resume Preview */}
      <div
        ref={resumeRef}
        className="bg-white shadow-lg rounded-lg p-6 max-w-3xl mx-auto mt-8"
      >
        <div className="flex flex-col md:flex-row items-center">
          {resumeData.image && (
            <img
              src={resumeData.image}
              alt="Profile"
              className="resume-img object-cover rounded border-2 border-gray-300 mb-4 md:mb-0 md:mr-4"
            />
          )}
          <div>
            <h1 className="text-2xl font-bold">{resumeData.name}</h1>
            <p>{resumeData.address}</p>
            <p>{resumeData.phone}</p>
            <p>{resumeData.email}</p>
          </div>
        </div>

        {/* Organized Sections */}
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-2">About Me</h2>
          <p className="whitespace-pre-wrap">{resumeData.about}</p>

          <h2 className="text-xl font-bold mt-4">Skills</h2>
          <ul className="list-disc ml-6 whitespace-pre-wrap">
            {resumeData.skills.split("\n").map((skill, idx) => (
              <li key={idx}>{skill}</li>
            ))}
          </ul>

          <h2 className="text-xl font-bold mt-4">Experience</h2>
          <ul className="list-disc ml-6 whitespace-pre-wrap">
            {resumeData.experience.split("\n").map((exp, idx) => (
              <li key={idx}>{exp}</li>
            ))}
          </ul>

          <h2 className="text-xl font-bold mt-4">Education</h2>
          <ul className="list-disc ml-6 whitespace-pre-wrap">
            {resumeData.education.split("\n").map((edu, idx) => (
              <li key={idx}>{edu}</li>
            ))}
          </ul>

          {/* Display Projects */}
          {resumeData.projects.length > 0 && (
            <div className="mt-4">
              <h2 className="text-xl font-bold">Projects</h2>
              <ul className="list-disc ml-6">
                {resumeData.projects.map((project, idx) => (
                  <li key={idx}>
                    <strong>{project.title}</strong>
                    <p>{project.description}</p>
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600"
                      >
                        {project.link}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Display Custom Sections */}
          {resumeData.customSections.length > 0 &&
            resumeData.customSections.map((section, idx) => (
              <div key={idx} className="mt-4">
                <h2 className="text-xl font-bold">{section.sectionTitle}</h2>
                <p>{section.sectionDescription}</p>
              </div>
            ))}
        </div>
      </div>

    </>
  );
};

export default ResumeMaker;
