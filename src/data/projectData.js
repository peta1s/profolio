import citygisPortImage from "../../assets/project-citygis-port.webp";
import citygisTianmuImage from "../../assets/project-citygis-tianmu.webp";
import fdOpsImage from "../../assets/project-fd-ops.webp";
import fdPortfolioImage from "../../assets/project-fd-portfolio.webp";
import fdPortfolioAnalysisImage from "../../assets/project-fd-portfolio-analysis.webp";
import fdPortfolioHoldingsImage from "../../assets/project-fd-portfolio-holdings.webp";
import fdPortfolioRebalanceImage from "../../assets/project-fd-portfolio-rebalance.webp";
import fdReportImage from "../../assets/project-fd-report.webp";
import fdReportEmailPreviewImage from "../../assets/project-fd-report-email-preview.webp";
import jobrightAutofillImage from "../../assets/project-jobright-autofill.webp";
import jobrightResumeEnhanceImage from "../../assets/project-jobright-resume enhance.png";

export const projectDisplayMeta = {
  "citygis-tianmu": {
    company: "CityGIS",
    title: "天目西路街道营商平台",
    timeline: "Summer 2025",
    role: "全栈开发",
    org: "上海市测绘院",
    with: "CityGIS Team",
    summary: "A street-level business management platform for buildings, companies, population data, and investment metrics.",
    tags: ["GIS", "Dashboard", "Operations"],
    accent: "blue",
  },
  "citygis-port": {
    company: "CityGIS",
    title: "数智港航云平台",
    timeline: "Summer 2024",
    role: "前端开发",
    org: "智汇交港部门",
    with: "CityGIS Team",
    summary: "A visual command surface for port operation metrics, coastline management, and enterprise risk data.",
    tags: ["Port", "Risk", "Visualization"],
    accent: "indigo",
  },
  "fd-portfolio": {
    company: "FD Insurance",
    title: "FOF模拟组合",
    timeline: "Spring 2026",
    role: "前端开发",
    org: "信息技术部",
    with: "FD Product Team",
    summary: "面向投研与产品跟踪场景的前端管理平台，支持基金数据查看、组合模拟、策略图表与周报管理。",
    tags: ["Vue 2", "ECharts", "Funds"],
    accent: "rose",
  },
  "fd-report": {
    company: "FD Insurance",
    title: "方德周报自动分发系统",
    timeline: "Spring 2026",
    role: "全栈开发",
    org: "信息技术部",
    with: "FastAPI / WeCom API",
    summary:
      "A backend service that locates weekly report files, parses Excel content, and distributes WeCom group notifications and emails.",
    tags: ["FastAPI", "WeCom", "Excel"],
    accent: "orange",
  },
  "fd-ops": {
    company: "FD Insurance",
    title: "方德全平台概览",
    timeline: "Spring 2026",
    role: "全栈开发",
    org: "信息技术部",
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
    title: "天目西路街道营商平台",
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
    title: "FOF模拟组合",
    image: fdPortfolioImage,
    summary: "面向投研与产品跟踪场景的前端管理平台，支持基金数据查看、组合模拟、策略图表与周报管理。",
    overview:
      "这是一个基于 Vue 2 的投研管理类前端项目，主要围绕私募基金、产品跟踪、模拟组合和策略图表等业务模块展开。项目目标是把分散的基金数据、组合分析结果和策略图表集中到统一后台中，方便用户完成产品筛选、组合创建、收益分析、指标查看和内容管理等日常操作。",
    problem:
      "项目要解决的是投研数据查看与组合分析流程分散、页面交互复杂、数据展示维度较多的问题。前端需要在表格、图表、筛选器和详情页之间建立稳定清晰的操作路径。",
    myWork: [
      "参与产品跟踪与模拟组合模块的页面开发，包括组合创建、组合详情、收益曲线、区间收益和年度指标等功能。",
      "处理组合创建后的数据刷新、日期格式兼容、接口异常兜底和详情页展示一致性问题。",
      "对 simulationPortfolio 模块进行结构梳理，将大文件拆分为组件、mixins 和工具函数，提升代码可读性与后续维护效率。",
    ],
    keyFeatures: [
      "模拟组合创建：支持按权重或金额配置基金产品，并根据输入生成投资计划。",
      "组合详情分析：支持时间范围筛选，展示收益曲线、回撤、区间收益、年度指标和持仓相关数据。",
      "策略与产品跟踪：包含私募基金详情、基金对比、策略图表、产品配置和周报管理等业务页面。",
    ],
    technicalDetails: [
      "前端技术栈使用 Vue 2、Vue Router、Vuex、Element UI、Axios 和 ECharts。",
      "图表展示基于 ECharts，页面中包含收益走势、回撤、区间收益等多维数据可视化。",
      "接口请求通过统一 request 封装处理，模拟组合模块中对日期格式、空数据、并发请求失败等场景做了兼容。",
    ],
    outcome:
      "项目形成了覆盖投研产品跟踪、组合模拟和策略图表管理的后台界面。通过模块拆分和数据兼容处理，提升了模拟组合功能的稳定性，也让后续维护和问题定位更清晰。",
    detailImages: [
      {
        image: fdPortfolioAnalysisImage,
        caption: "模拟组合详情页，展示收益曲线、动态回撤、区间收益和年度指标。",
        wide: true,
      },
      {
        image: fdPortfolioRebalanceImage,
        caption: "模拟组合创建页，展示投入金额、再平衡规则和按权重配置产品的流程。",
      },
      {
        image: fdPortfolioHoldingsImage,
        caption: "持仓与交易记录视图，展示组合持仓、权重、收益和再平衡交易来源。",
      },
    ],
  },
  {
    id: "fd-report",
    companyKey: "fd",
    company: "方德保险代理有限公司",
    title: "方德周报自动分发系统",
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
    title: "方德全平台概览",
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
