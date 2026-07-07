import citygisPortImage from "../../assets/project-citygis-port.png";
import citygisTianmuImage from "../../assets/project-citygis-tianmu.png";
import fdOpsImage from "../../assets/project-fd-ops.png";
import fdPortfolioImage from "../../assets/project-fd-portfolio.png";
import fdReportImage from "../../assets/project-fd-report.png";
import fdReportEmailPreviewImage from "../../assets/project-fd-report-email-preview.png";
import jobrightAutofillImage from "../../assets/project-jobright-autofill.png";
import jobrightResumeEnhanceImage from "../../assets/project-jobright-resume enhance.png";

export const projectDisplayMeta = {
  "citygis-tianmu": {
    company: "CityGIS",
    title: "Tianmu Business Platform",
    timeline: "Summer 2025",
    role: "Frontend / Product",
    org: "Urban Data",
    with: "CityGIS Team",
    summary: "A street-level business management platform for buildings, companies, population data, and investment metrics.",
    tags: ["GIS", "Dashboard", "Operations"],
    accent: "blue",
  },
  "citygis-port": {
    company: "CityGIS",
    title: "Smart Port Cloud",
    timeline: "Summer 2024",
    role: "Frontend / Visualization",
    org: "Port Operations",
    with: "CityGIS Team",
    summary: "A visual command surface for port operation metrics, coastline management, and enterprise risk data.",
    tags: ["Port", "Risk", "Visualization"],
    accent: "indigo",
  },
  "fd-portfolio": {
    company: "FD Insurance",
    title: "Portfolio Analysis",
    timeline: "Spring 2026",
    role: "Frontend Engineering",
    org: "Investment Research",
    with: "FD Product Team",
    summary: "A fund portfolio analysis view for returns, drawdowns, time ranges, and annual indicators.",
    tags: ["Finance", "Analytics", "Funds"],
    accent: "rose",
  },
  "fd-report": {
    company: "FD Insurance",
    title: "Production Weekly Report",
    timeline: "Spring 2026",
    role: "Backend / Automation",
    org: "Information Technology",
    with: "FastAPI / WeCom API",
    summary:
      "A backend service that locates weekly report files, parses Excel content, and distributes WeCom group notifications and emails.",
    tags: ["FastAPI", "WeCom", "Excel"],
    accent: "orange",
  },
  "fd-ops": {
    company: "FD Insurance",
    title: "Research Ops Center",
    timeline: "Spring 2026",
    role: "Product Engineering",
    org: "Research Platform",
    with: "FD Product Team",
    summary: "A monitoring center for active users, core behaviors, and high-frequency feature usage.",
    tags: ["Metrics", "Users", "Operations"],
    accent: "green",
  },
  "jobright-autofill": {
    company: "Jobright AI",
    title: "Jobright Autofill",
    timeline: "Winter 2025",
    role: "Product Engineering",
    org: "AI Job Search",
    with: "Jobright AI Team",
    summary: "A browser-side autofill experience for job applications, profile completeness, and application flow.",
    tags: ["AI", "Extension", "Autofill"],
    accent: "purple",
  },
};

export const projectShowcases = [
  {
    id: "citygis-tianmu",
    companyKey: "citygis",
    company: "上海城市地理信息系统发展有限公司",
    title: "天目西路街道营商管理平台",
    image: citygisTianmuImage,
    summary: "围绕街区楼宇、企业、人口和招商指标的信息驾驶舱。",
  },
  {
    id: "citygis-port",
    companyKey: "citygis",
    company: "上海城市地理信息系统发展有限公司",
    title: "数智港航云平台",
    image: citygisPortImage,
    summary: "港航运行指标、岸线管理和企业风险数据的综合可视化大屏。",
  },
  {
    id: "fd-portfolio",
    companyKey: "fd",
    company: "方德保险代理有限公司",
    title: "模拟组合分析",
    image: fdPortfolioImage,
    summary: "基金组合收益、回撤、区间收益和年度指标分析页面。",
  },
  {
    id: "fd-report",
    companyKey: "fd",
    company: "方德保险代理有限公司",
    title: "生产系统周报",
    image: fdReportImage,
    summary: "一个用于自动定位周报文件、解析 Excel 内容，并通过企业微信完成群通知与邮件分发的后端服务。",
    overview:
      "该项目围绕企业周报分发流程搭建，目标是把任务配置、文件定位、Excel 内容解析、企业微信通知、邮件发送和执行日志统一到一个可调度的后端服务中。系统支持本地文件与企业微信微盘文件来源，可按任务配置自动扫描到期任务，也提供手动触发和失败重试接口，适合处理固定周期、多人接收、需要留痕的周报通知场景。",
    problem:
      "周报分发通常涉及查找最新文件、整理项目进度、通知群组、发送邮件和保留执行记录等多个步骤。这个项目把这些重复且容易出错的操作流程化，并让文件来源、发送目标、调度时间和失败重试都可配置、可追踪。",
    myWork: [
      "设计并实现基于 FastAPI 的任务接口，包括手动触发、失败重试、任务列表和执行日志查询。",
      "实现分发编排服务，串联任务读取、幂等控制、文件定位、企业微信群通知、企业微信邮件发送和执行日志落库。",
      "实现周报 Excel 解析与 HTML 邮件渲染，将项目进度、待立项项目和生产问题数据整理为适合邮件阅读的结构。",
      "封装企业微信相关客户端，包括 access_token 获取、群机器人发送、邮件发送、微盘文件信息和下载流程。",
    ],
    keyFeatures: [
      "数据库驱动的分发任务配置，支持 cron、时区、文件路径模板、邮件模板、群消息模板和重试策略。",
      "支持自动调度、手动触发和失败重试，并记录每次执行的状态、文件路径、发送结果和错误信息。",
      "支持本地文件与企业微信微盘文件来源，微盘下载文件会写入临时缓存，使用完成后自动清理。",
      "可解析周报 Excel 内容，识别进行中项目、待立项项目、进度比例、日期和状态等信息。",
      "通过企业微信邮件接口发送 HTML 正文，可按配置附带原始 Excel 文件。",
    ],
    technicalDetails: [
      "后端使用 FastAPI 构建接口层，SQLAlchemy 负责任务、目标和执行日志的数据访问。",
      "APScheduler 以固定间隔扫描到期任务，结合 croniter 计算下一次运行时间。",
      "Redis 用于 access_token 缓存和任务幂等锁，避免同一任务在同一业务日期重复执行。",
      "企业微信 API 调用统一封装在 sender/client 层，使用 httpx 管理外部 HTTP 请求。",
      "Excel 解析基于 openpyxl，并提供 xlsx XML 兜底解析路径，提升对不同工作簿结构的兼容性。",
    ],
    outcome:
      "项目把周报文件查找、内容整理、群通知、邮件发送和执行留痕收敛到一个可配置服务中。可确认的价值在于减少手动处理步骤，提升周期性分发流程的一致性，并通过日志、重试和幂等控制增强可维护性与排障能力。",
    detailImages: [
      {
        image: fdReportEmailPreviewImage,
        caption: "Sent WeCom email preview generated from the weekly report data.",
      },
    ],
  },
  {
    id: "fd-ops",
    companyKey: "fd",
    company: "方德保险代理有限公司",
    title: "投研运营中心",
    image: fdOpsImage,
    summary: "统一监测平台活跃用户、核心行为和高频功能使用情况。",
  },
  {
    id: "jobright-autofill",
    companyKey: "jobright",
    company: "北京好职来智能科技有限公司（Jobright AI）",
    title: "Jobright Autofill",
    image: jobrightAutofillImage,
    images: [jobrightAutofillImage, jobrightResumeEnhanceImage],
    summary: "辅助求职申请填写的浏览器侧自动填充与资料完整度体验。",
  },
];

export const getProjectById = (id) =>
  projectShowcases.find((project) => project.id === id) ?? projectShowcases[0];

export const getProjectDisplayMeta = (project) => ({
  company: project.company,
  title: project.title,
  timeline: "2025",
  role: "Product Engineering",
  org: "Portfolio",
  with: "Renee Zhang",
  summary: project.summary,
  tags: ["Product", "Interface"],
  accent: "blue",
  ...(projectDisplayMeta[project.id] ?? {}),
});
