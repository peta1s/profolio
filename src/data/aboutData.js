import axiosLogo from "../../assets/sticker-axios.webp";
import citygisLogo from "../../assets/sticker-citygis.webp";
import elementPlusLogo from "../../assets/sticker-elementplus.webp";
import fdLogo from "../../assets/sticker-fd.webp";
import javaSpringLogo from "../../assets/sticker-javaspring.webp";
import jobrightAiLogo from "../../assets/sticker-jobrightai.webp";
import nodeLogo from "../../assets/sticker-node.webp";
import npmLogo from "../../assets/sticker-npm.webp";
import piniaLogo from "../../assets/sticker-pinia.webp";
import reactLogo from "../../assets/sticker-react.webp";
import reactNativeLogo from "../../assets/sticker-reactnative.webp";
import tailwindLogo from "../../assets/sticker-tailwindcss.webp";
import typescriptLogo from "../../assets/sticker-typescript.webp";
import viteLogo from "../../assets/sticker-vite.webp";
import vueLogo from "../../assets/sticker-vue.webp";
import nostalgiaUltraCover from "../../assets/nostalgia-ultra.jpg";
import { projectShowcases } from "./projectData";

export const navItems = [
  { id: "hello", label: "Hello!" },
  { id: "experience", label: "Experience" },
  { id: "stack", label: "Stack" },
  { id: "music", label: "Music" },
  { id: "movies", label: "Movies" },
];

export const techStack = [
  {
    name: "React",
    icon: reactLogo,
  },
  {
    name: "Vue",
    icon: vueLogo,
  },
  {
    name: "TypeScript",
    icon: typescriptLogo,
  },
  {
    name: "Node",
    icon: nodeLogo,
  },
  {
    name: "Java / Spring",
    icon: javaSpringLogo,
  },
  {
    name: "Vite",
    icon: viteLogo,
  },
  {
    name: "Tailwind CSS",
    icon: tailwindLogo,
  },
  {
    name: "React Native",
    icon: reactNativeLogo,
  },
  {
    name: "Pinia",
    icon: piniaLogo,
  },
  {
    name: "Element Plus",
    icon: elementPlusLogo,
  },
  {
    name: "Axios",
    icon: axiosLogo,
  },
  {
    name: "npm",
    icon: npmLogo,
  },
];

export const experiences = [
  {
    company: "Jobright AI",
    logo: jobrightAiLogo,
    role: "Jobright.ai-前端开发实习生",
    time: "2025.12-2026.02",
    summary: "参与Jobright Autofill插件的开发与后期重构",
    projectIds: ["jobright-autofill"],
  },
  {
    company: "上海城市地理信息系统发展有限公司",
    logo: citygisLogo,
    role: "上海城市地理信息系统发展有限公司-全栈开发实习生",
    time: "2024.07-2025.09",
    summary: "参与公司地信资源管理平台、政务大屏、ai中台系统的开发",
    projectIds: ["citygis-tianmu", "citygis-port"],
  },
  {
    company: "方德保险代理有限公司",
    logo: fdLogo,
    role: "方德保险代理有限公司-全栈开发实习生",
    time: "2026.04-2026.05",
    summary: "从产品设计到开发，独立负责完成方德全平台概览、方德生产周报自动分发系统。参与投研平台、销售管理系统、中台的需求开发",
    projectIds: ["fd-portfolio", "fd-report", "fd-ops"],
  },
];

export const projectById = new Map(projectShowcases.map((project) => [project.id, project]));

const createMusicItem = ({
  title,
  artist = "",
  year,
  term,
  favorite = false,
  coverUrl = null,
  appleCollectionId = null,
}) => {
  const searchText = [title, artist].filter(Boolean).join(" ");

  return {
    title,
    artist,
    year,
    favorite,
    coverUrl,
    appleCollectionId,
    href: `https://music.163.com/#/search/m/?s=${encodeURIComponent(searchText)}`,
    itunes: {
      term: term ?? searchText,
      country: "US",
      media: "music",
      entity: "album",
      limit: 5,
    },
  };
};

export const musicItems = [
  { year: "2022", title: "Awake", artist: "ILLENIUM", appleCollectionId: 1701059375, coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/3d/8d/01/3d8d0121-7405-13a1-029c-43299592c91d/191515614247.png/600x600bb.jpg" },
  { year: "2022", title: "beerbongs & bentleys", artist: "Post Malone", appleCollectionId: 1373516902, coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/7e/3c/4e/7e3c4ef6-daa7-cc10-57d0-45f5a562eaf5/18UMGIM22101.rgb.jpg/600x600bb.jpg" },
  { year: "2022", title: "Stoney", artist: "Post Malone", appleCollectionId: 1596836200, coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/e2/d7/1a/e2d71a57-eb93-2128-cd14-586acabfe0cf/21UM1IM45582.rgb.jpg/600x600bb.jpg" },
  { year: "2022", title: "dont smile at me", artist: "Billie Eilish", appleCollectionId: 1440898929, coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/02/1d/30/021d3036-5503-3ed3-df00-882f2833a6ae/17UM1IM17026.rgb.jpg/600x600bb.jpg" },
  { year: "2022", title: "Purpose", artist: "Justin Bieber", appleCollectionId: 1442504476, coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/15/44/a1/1544a1b8-e4d3-1ef7-3464-8d42f4a67d52/15UMGIM59415.rgb.jpg/600x600bb.jpg" },
  { year: "2022", title: "After Hours", artist: "The Weeknd", appleCollectionId: 1499378108, coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/6f/bc/e6/6fbce6c4-c38c-72d8-4fd0-66cfff32f679/20UMGIM12176.rgb.jpg/600x600bb.jpg" },
  { year: "2022", title: "Bad Vibes Forever", artist: "XXXTENTACION", appleCollectionId: 1490154776, coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/44/aa/3e/44aa3e96-1868-0f2f-428e-b49919766db7/194690064296_cover.jpg/600x600bb.jpg" },
  { year: "2022", title: "Hollywood's Bleeding", artist: "Post Malone", appleCollectionId: 1477880265, coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/7b/1b/1b/7b1b1b0b-7ce2-b223-f9e0-8e36abe51877/19UMGIM78325.rgb.jpg/600x600bb.jpg" },
  { year: "2022", title: "Notes On a Conditional Form", artist: "The 1975", appleCollectionId: 1513201189, coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/b7/21/05/b721058d-bbd6-b10e-e77a-02d3f79156cc/19UMGIM67710.rgb.jpg/600x600bb.jpg" },
  { year: "2022", title: "Norman Fucking Rockwell!", artist: "Lana Del Rey", favorite: true, appleCollectionId: 1474669063, coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/c6/5f/b9/c65fb9eb-da2f-89a9-b640-2fff1fc3a660/19UMGIM61350.rgb.jpg/600x600bb.jpg" },
  { year: "2022", title: "I Like It When You Sleep, for You Are So Beautiful yet So Unaware of It", artist: "The 1975", favorite: true, appleCollectionId: 1440840422, coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/da/fa/e2/dafae265-34b5-2252-ad83-ba7d510a7413/15UMGIM62906.rgb.jpg/600x600bb.jpg" },
  { year: "2022", title: "To the Moon", artist: "Kan R. Gao", appleCollectionId: 1265057463, coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music128/v4/84/f0/2a/84f02a95-e440-8671-6cbb-e63d8a7e02bf/4713108178705.jpg/600x600bb.jpg" },
  { year: "2022", title: "Beatopia", artist: "beabadoobee", appleCollectionId: 1631390001, coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/15/13/6b/15136b77-3a59-2f4e-d0ae-588f8d64802b/196922094361_Cover.jpg/600x600bb.jpg" },
  { year: "2022", title: "从流入夜", artist: "鱼翅Fin", appleCollectionId: 1630929433, coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/b6/1c/db/b61cdb70-89f2-0128-14b3-b3deec1eb6c4/cover.jpg/600x600bb.jpg" },
  { year: "2022", title: "CASE STUDY 01", artist: "Daniel Caesar", appleCollectionId: 1799080239, coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/aa/16/83/aa1683e3-6b82-e14c-8c56-2dad38d3dd02/193483999333.jpg/600x600bb.jpg" },
  { year: "2022", title: "Blonde", artist: "Frank Ocean", favorite: true, appleCollectionId: 1146195596, coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/bb/45/68/bb4568f3-68cd-619d-fbcb-4e179916545d/BlondCover-Final.jpg/600x600bb.jpg" },
  { year: "2022", title: "Being Funny in a Foreign Language", artist: "The 1975", appleCollectionId: 1850018862, coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/1f/c7/98/1fc7988e-0a39-5724-1390-e45246250e24/198704825934_Cover.jpg/600x600bb.jpg" },
  { year: "2022", title: "Hot Pink", artist: "Doja Cat", appleCollectionId: 1560224889, coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/e4/00/aa/e400aa3d-6fa9-14f1-faf7-f74a0c1ad3af/886449157273.jpg/600x600bb.jpg" },
  { year: "2022", title: "?", artist: "XXXTENTACION", appleCollectionId: 1359292515, coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/f0/b0/21/f0b021d2-8bfb-e2ff-93f9-17c64147f971/18UMGIM14845.rgb.jpg/600x600bb.jpg" },
  { year: "2022", title: "WHEN WE ALL FALL ASLEEP, WHERE DO WE GO?", artist: "Billie Eilish", appleCollectionId: 1450695723, coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/1a/37/d1/1a37d1b1-8508-54f2-f541-bf4e437dda76/19UMGIM05028.rgb.jpg/600x600bb.jpg" },
  { year: "2022", title: "COSMIC", artist: "Bazzi", appleCollectionId: 1369438774, coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/7c/98/07/7c98072e-e826-d77c-e829-daa87f5706b9/075679874580.jpg/600x600bb.jpg" },
  { year: "2022", title: "Fresh Soul", artist: "吕彦良", appleCollectionId: 1582615304, coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/b5/18/4a/b5184adb-4fa0-6b06-290c-d2fe34050f8b/cover.jpg/600x600bb.jpg" },
  { year: "2022", title: "A Brief Inquiry Into Online Relationships", artist: "The 1975", appleCollectionId: 1435546528, coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/ea/24/e2/ea24e228-6bf1-625a-11dc-d83d5ee780e6/18UMGIM53788.rgb.jpg/600x600bb.jpg" },
  { year: "2022", title: "Channel Orange", artist: "Frank Ocean", appleCollectionId: 1440765580, coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/04/f8/63/04f863fc-2852-604f-c910-a97ac069506b/12UMGIM40339.rgb.jpg/600x600bb.jpg" },
  { year: "2023", title: "Ctrl", artist: "SZA", appleCollectionId: 1239976329, coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/20/28/8f/20288f6f-fbf2-fb0f-6732-e7d334e1ff50/886446548432.jpg/600x600bb.jpg" },
  { year: "2023", title: "Did you know that there's a tunnel under Ocean Blvd", artist: "Lana Del Rey", appleCollectionId: 1655349115, coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music113/v4/7c/c4/e5/7cc4e501-6b09-b379-bb54-a40de4615aa3/22UM1IM33313.rgb.jpg/600x600bb.jpg" },
  { year: "2023", title: "Never Enough", artist: "Daniel Caesar", appleCollectionId: 1671667136, coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/24/4f/ec/244fec58-ea20-e0b0-eea6-e06c6aff948b/23UMGIM14483.rgb.jpg/600x600bb.jpg" },
  { year: "2023", title: "恋人へ", artist: "Lamp", appleCollectionId: 1486281113, coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/96/34/bd/9634bd06-4484-3792-ce1b-a64a96710d22/4521640105079_cover.jpg/600x600bb.jpg" },
  { year: "2023", title: "Life Is Strange Cover: Partie 1 - EP", artist: "DOLKINS", appleCollectionId: 1091185705, coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/4c/d3/46/4cd34628-a245-9ef5-ae26-5528c36a0fce/xM3B3.png/600x600bb.jpg" },
  { year: "2023", title: "Life Is Strange Original Soundtrack Cover: Partie 2 - EP", artist: "DOLKINS", appleCollectionId: 1104513662, coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/9c/e3/4b/9ce34b2a-a559-3dd6-a6dc-87d26deec173/CUNW2.png/600x600bb.jpg" },
  { year: "2023", title: "Can You Hear the Whistle Blow?", artist: "缺省", appleCollectionId: 1526791725, coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/6d/58/db/6d58db7c-5207-7fd0-de9e-81460c00f7cb/cover.jpg/600x600bb.jpg" },
  { year: "2023", title: "One More Light", artist: "Linkin Park", appleCollectionId: 1204427627, coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/de/b4/76/deb4760b-1733-d09f-8ab5-3da9381d5080/093624913214.jpg/600x600bb.jpg" },
  { year: "2023", title: "Sessions: Diana", artist: "League of Legends Music", appleCollectionId: 1832396755, coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/3e/eb/8b/3eeb8bbc-c2e2-48bc-eca0-3ff2b06f0bf1/00198704644665_Cover.jpg/600x600bb.jpg" },
  { year: "2023", title: "Sessions: Vi", artist: "League of Legends Music", appleCollectionId: 1833100909, coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/9d/b1/cf/9db1cf98-804d-f6d1-3b7f-f7a7723e4840/00198704650130_Cover.jpg/600x600bb.jpg" },
  { year: "2023", title: "Eternal Sunshine of the Spotless Mind", artist: "Jon Brion", appleCollectionId: 1442912229, coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/9a/cc/ea/9accea7e-6cbe-873b-27fb-fd11eb1a7f92/00720616244925.rgb.jpg/600x600bb.jpg" },
  { year: "2024", title: "Lost in Translation", artist: "Various Artists", appleCollectionId: 164362427, coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/11/dc/f4/11dcf4a2-28fb-59bd-a660-6d50474d0f7c/mzi.ncxnbkxd.jpg/600x600bb.jpg" },
  { year: "2024", title: "Hot Space", artist: "Queen", appleCollectionId: 1441457468, coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/ec/fa/01/ecfa0198-a9c1-3b0a-c159-fa2eca39d92c/14UMGIM42217.rgb.jpg/600x600bb.jpg" },
  { year: "2024", title: "ME?", artist: "吕彦良", appleCollectionId: 1776808592, coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/e8/c6/74/e8c67405-9b61-bf4e-64d2-99e024546612/24UM1IM22000.rgb.jpg/600x600bb.jpg" },
  { year: "2024", title: "Her", artist: "Arcade Fire", appleCollectionId: 1553022037, coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/64/a3/db/64a3db4d-942b-40dd-c97b-4b104885d6e0/886448820741.jpg/600x600bb.jpg" },
  { year: "2024", title: "Outer Wilds Original Soundtrack", artist: "Andrew Prahlow", appleCollectionId: 1467259296, coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/87/af/e2/87afe22c-d532-53b5-a9f6-43abf37363ce/859732734925_cover.jpg/600x600bb.jpg" },
  { year: "2024", title: "共同的土地", artist: "缺省", appleCollectionId: 1707500254, coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/da/36/63/da366343-d82f-fbe0-ac1f-f9101d6a1004/cover.jpg/600x600bb.jpg" },
  { year: "2024", title: "California Nebula", artist: "缺省", appleCollectionId: 1459960630, coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/c1/21/54/c121549e-6145-ebec-b78b-303b513c9d90/6971928841348.jpg/600x600bb.jpg" },
  { year: "2024", title: "LSC", artist: "ラブリーサマーちゃん", appleCollectionId: 1413646778, coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music118/v4/9f/3c/58/9f3c5892-4269-6de9-b840-6f0b7ae0aa77/VICL-64617.jpg/600x600bb.jpg" },
  { year: "2024", title: "Glitter", artist: "Pasteboard", favorite: true, appleCollectionId: 294138764, coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/ff/e2/04/ffe20437-8885-654f-3d10-7c17b6091583/mzi.vdaztgcv.jpg/600x600bb.jpg" },
  { year: "2024", title: "世界", artist: "LUCA / haruka nakamura", appleCollectionId: 1535912232, coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/48/0f/57/480f57dc-9830-d740-99c6-c894941a3c26/cover.jpg/600x600bb.jpg" },
  { year: "2024", title: "Smithereens", artist: "Joji", appleCollectionId: 1776742570, coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/53/97/a8/5397a8df-b197-6eae-8b53-a4c871563a54/93624864394.jpg/600x600bb.jpg" },
  { year: "2025", title: "Straw, Water, Pinstripe", artist: "Roly Poly Rag Bear", appleCollectionId: 1801348659, coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/26/3a/5a/263a5adc-51c5-6cc9-38ae-0a24991dce0e/artwork.jpg/600x600bb.jpg" },
  { year: "2025", title: "An Overview on Phenomenal Nature", artist: "Cassandra Jenkins", appleCollectionId: 1539427484, coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/08/7f/29/087f2972-9e02-4f6e-670c-d69d364336c0/600197016428.jpg/600x600bb.jpg" },
  { year: "2025", title: "Abbey Road", artist: "The Beatles", appleCollectionId: 1441164426, coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/df/db/61/dfdb615d-47f8-06e9-9533-b96daccc029f/18UMGIM31076.rgb.jpg/600x600bb.jpg" },
  { year: "2025", title: "HELP EVER HURT COVER", artist: "藤井風", appleCollectionId: 1505498769, coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/96/4e/5b/964e5b6e-4766-63ba-7e50-9f8a5bd0569e/20UMGIM17280.rgb.jpg/600x600bb.jpg" },
  { year: "2025", title: "Don't Know Why", artist: "Norah Jones", appleCollectionId: 723552656, coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/6e/e8/60/6ee860c1-dd50-eb8a-cbbe-a1274f69ad59/13UABIM49412.rgb.jpg/600x600bb.jpg" },
  { year: "2025", title: "Loveless", artist: "My Bloody Valentine", appleCollectionId: 1556921230, coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/4c/e1/51/4ce15131-7ac5-daf5-bf62-0202f27d691d/887830015998.png/600x600bb.jpg" },
  { year: "2025", title: "Life in a Vacuum", artist: "缺省", appleCollectionId: 1454491329, coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/aa/18/54/aa185486-3eb0-c3e0-5bfa-e44690c19068/6971928841096.jpg/600x600bb.jpg" },
  { year: "2025", title: "Nectar", artist: "Joji", appleCollectionId: 1724875820, coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/06/fb/8e/06fb8e9a-6748-3bad-8a84-5d00b15e4857/190296849497.jpg/600x600bb.jpg" },
  { year: "2025", title: "Nostalgia, Ultra", artist: "Frank Ocean", coverUrl: nostalgiaUltraCover },
  { year: "2025", title: "Linger Awhile", artist: "Samara Joy", appleCollectionId: 1637144888, coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/3c/1f/b8/3c1fb8bc-0b20-19c0-0993-250b8091b7d9/22UMGIM80456.rgb.jpg/600x600bb.jpg" },
  { year: "2025", title: "What's the Story Morning Glory? (Remastered)", artist: "Oasis", appleCollectionId: 894949345, coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/3a/ed/91/3aed9186-a837-b54b-2a67-ab886fc2a542/886444642767.jpg/600x600bb.jpg" },
  { year: "2026", title: "跟着感觉走", artist: "张震岳", appleCollectionId: 1827445748, coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/96/98/2a/96982a65-ad18-8da4-fa87-96d84b168bbc/4710149716781_cover.jpg/600x600bb.jpg" },
  { year: "2026", title: "Willoughby Tucker, I'll Always Love You", artist: "Ethel Cain", appleCollectionId: 1818431571, coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/a5/dd/d4/a5ddd4a0-9036-c816-0ea7-e7899a820222/199350860195.jpg/600x600bb.jpg" },
  { year: "2026", title: "American Football", artist: "American Football", appleCollectionId: 1651333864, coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/17/fc/53/17fc5379-78f6-a661-369b-4fa27875de78/644110002563.png/600x600bb.jpg" },
  { year: "2026", title: "Is It Gonna Happen Again?", artist: "Jody", appleCollectionId: 1880956582, coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/67/dc/ab/67dcabdc-cdb4-cd17-2551-456b9e22a44f/artwork.jpg/600x600bb.jpg" },
  { year: "2026", title: "2, The EP.", artist: "milk.", appleCollectionId: 1579427509, coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/57/1d/c9/571dc939-73d4-9416-922e-d92fe69555ab/193436266789_01_img001.jpg/600x600bb.jpg" },
  { year: "2026", title: "From Left to Right", artist: "Bill Evans", favorite: true, appleCollectionId: 1498963391, coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/3a/5b/f0/3a5bf084-75e0-2489-ffa4-ce2d787d3e43/20UMGIM09317.rgb.jpg/600x600bb.jpg" },
  { year: "2026", title: "Simply Blue", artist: "Akiko", appleCollectionId: 1509382190, coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music113/v4/4b/34/33/4b3433ae-5e50-2d68-a16f-ce3ee64c8fa5/20UMGIM16562.rgb.jpg/600x600bb.jpg" },
  { year: "2026", title: "小霞3.0", artist: "小霞", appleCollectionId: 1720087055, coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/59/5f/e3/595fe3f4-333d-1615-d418-61f07bf40366/196871706735.jpg/600x600bb.jpg" },
  { year: "2026", title: "灰太阳", artist: "施鑫文月", appleCollectionId: 1796849946, coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/64/46/1c/64461c6d-69a8-64b4-6488-2dccb54f87a9/199066834305.jpg/600x600bb.jpg" },
  { year: "2026", title: "Cupid Deluxe", artist: "Blood Orange", appleCollectionId: 716767448, coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/52/ac/30/52ac30de-191a-7f46-b6cd-051f5be848ad/BloodOrangeCVRupdated.jpg/600x600bb.jpg" },
].map(createMusicItem);

const movieShelfGroups = {
  2026: [
    "铁肺",
    "社交网络",
    "血钻",
    "罗斯玛丽的婴儿",
    "火车梦",
    "牧羊人",
    "冰血暴",
    "革命之路",
    "挽救计划",
    "后室",
    "未麻的部屋",
  ],
  2025: [
    "末代皇帝",
    "无间道",
    "新世界",
    "白日梦想家",
    "爆裂鼓手",
    "某种物质",
    "闪灵",
    "沙丘1",
    "沙丘2",
    "路边野餐",
    "触不可及",
    "看见恶魔",
    "老男孩",
    "亲切的金子",
    "F1：狂飙飞车",
    "德州巴黎",
    "出租车司机",
    "寄生虫",
    "遗传厄运",
  ],
  2024: [
    "晒后假日",
    "海上钢琴师",
    "盗梦空间",
    "这个杀手不太冷",
    "春光乍泄",
    "狩猎",
    "异形：夺命舰",
    "守望者",
    "迷雾",
    "幸福终点站",
    "怪形",
  ],
  2023: [
    "听到涛声",
    "暖暖内含光",
    "一一",
    "悲情城市",
    "西线无战事",
    "迷失东京",
    "绿皮书",
    "老无所依",
    "搏击俱乐部",
    "花样年华",
    "阳光灿烂的日子",
    "海边的曼彻斯特",
    "蜘蛛侠：纵横宇宙",
    "宇宙探索编辑部",
    "柯达胶卷",
    "降临",
    "奥本海默",
    "海蒂和爷爷",
    "芭比",
    "猫鼠游戏",
  ],
  2022: [
    "美国往事",
    "2001太空漫游",
    "重庆森林",
    "关于莉莉周的一切",
    "银翼杀手",
    "银翼杀手2049",
    "爱乐之城",
    "小妇人",
    "心灵捕手",
    "蝴蝶效应",
    "何以为家",
    "时空恋旅人",
    "傲慢与偏见",
    "请以你的名字呼唤我",
    "布达佩斯大饭店",
    "牯岭街少年杀人事件",
    "普罗米修斯",
    "我们的父辈",
    "了不起的盖茨比",
    "窃听风暴",
    "信条",
    "霸王别姬",
    "异形1",
    "异形2",
    "异形3",
    "科洛弗档案",
    "小丑",
  ],
};

const favoriteMovieTitles = new Set([
  "一一",
  "暖暖内含光",
  "迷失东京",
]);

export const movieItems = Object.entries(movieShelfGroups).flatMap(([year, titles]) =>
  titles.map((title) => ({
    title,
    meta: year,
    year,
    favorite: favoriteMovieTitles.has(title),
    href: `https://www.douban.com/search?q=${encodeURIComponent(title)}`,
  })),
);
