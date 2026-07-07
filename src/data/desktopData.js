import appleIcon from "../../assets/renee-apple.svg";
import folderIcon from "../../assets/renee-folder.png";
import grLensIcon from "../../assets/gr-lens.png";
import trashIcon from "../../assets/renee-trash.png";

export { appleIcon };

export const desktopIcons = [
  { id: "projectsWindow", label: "Projects", icon: folderIcon, x: "74vw", y: "14vh" },
  { id: "cameraWindow", label: "Camera", icon: grLensIcon, x: "48vw", y: "16vh" },
  { id: "galleryWindow", label: "Gallery", icon: folderIcon, x: "57vw", y: "34vh" },
  { id: "ipodWindow", label: "iPod", icon: null, x: "43vw", y: "47vh", ipod: true },
  { id: "aboutWindow", label: "About me", icon: folderIcon, x: "18vw", y: "28vh" },
  { id: "notesWindow", label: "Notes", icon: folderIcon, x: "69vw", y: "38vh" },
  { id: "contactWindow", label: "Contact", icon: folderIcon, x: "30vw", y: "48vh" },
  { id: "trashWindow", label: "Trash", icon: trashIcon, x: "84vw", y: "70vh", trash: true },
];

export const windows = {
  aboutWindow: {
    title: "About me.txt",
    left: "40px",
    top: "42px",
    width: "calc(100vw - 80px)",
  },
  projectsWindow: {
    title: "Projects",
    left: "32px",
    top: "52px",
    width: "calc(100vw - 64px)",
  },
  cameraWindow: {
    title: "Camera",
    left: "11vw",
    top: "62px",
    width: "760px",
  },
  galleryWindow: {
    title: "Gallery",
    left: "7vw",
    top: "54px",
    width: "1180px",
  },
  ipodWindow: {
    title: "iPod",
    left: "63vw",
    top: "110px",
    width: "360px",
  },
  notesWindow: {
    title: "Notes",
    left: "14vw",
    top: "56vh",
    width: "460px",
  },
  contactWindow: {
    title: "Contact",
    left: "58vw",
    top: "54vh",
    width: "390px",
  },
  trashWindow: {
    title: "Trash",
    left: "63vw",
    top: "24vh",
    width: "360px",
  },
};

export const windowIds = Object.keys(windows);
