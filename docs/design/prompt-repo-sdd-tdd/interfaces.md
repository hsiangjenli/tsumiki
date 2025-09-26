# prompt-repo-sdd-tdd 格式標準定義

## Markdown 文件格式規範

### 基本文件結構
每個 prompt 文件必須遵循以下標準結構：

```markdown
---
title: "Prompt 標題"
description: "詳細的功能描述"
category: "分類/子分類"
version: "1.0.0"
author: "作者名稱"
tags: ["標籤1", "標籤2"]
parameters:
  - name: "參數名稱"
    type: "string|number|boolean"
    description: "參數說明"
    required: true|false
    default: "預設值"
created: "2024-01-01"
updated: "2024-01-01"
---

# Prompt 標題

## 目的
[清晰說明此 prompt 的用途和目標]

## 前提條件
- [必要的準備條件]
- [環境要求]
- [知識前提]

## 執行流程

### Phase 1: [階段名稱]
[階段描述]

**輸入**：
- [期望的輸入內容]

**處理步驟**：
1. [步驟1]
2. [步驟2]
3. [步驟3]

**輸出**：
- [產出的結果格式]

### Phase 2: [階段名稱]
[繼續其他階段...]

## 品質標準

### 成功指標
- [可衡量的成功標準]

### 驗收條件
- [具體的驗收標準]

## 使用範例

### 範例 1: [情境名稱]
**輸入**：
```
[範例輸入]
```

**輸出**：
```
[期望輸出]
```

## 注意事項
- [重要的使用提醒]
- [常見錯誤避免]
- [最佳實務建議]

## 相關資源
- [相關 prompt 連結]
- [參考文檔]
- [外部資源]
```

**信賴等級**：🔵 確定（基於架構設計）

## YAML Frontmatter 欄位定義

### 必要欄位

| 欄位 | 類型 | 說明 | 範例 |
|------|------|------|------|
| `title` | string | Prompt 的簡潔標題 | "需求訪談 Prompt" |
| `description` | string | 詳細的功能描述 | "引導使用者完整描述需求的結構化訪談流程" |
| `category` | string | 分類路徑 | "requirements/functional" |
| `version` | string | 語意化版本號 | "1.0.0" |
| `author` | string | 主要作者 | "Prompt Designer" |

### 選用欄位

| 欄位 | 類型 | 說明 | 範例 |
|------|------|------|------|
| `tags` | string[] | 關鍵字標籤 | ["需求分析", "訪談", "EARS"] |
| `parameters` | object[] | 參數定義列表 | [見下方參數定義] |
| `created` | string | 創建日期 | "2024-01-01" |
| `updated` | string | 最後更新日期 | "2024-01-01" |
| `deprecated` | boolean | 是否已棄用 | false |
| `replaces` | string[] | 取代的舊版本 | ["old-prompt-v1"] |

## 參數定義格式

### 參數物件結構
```yaml
parameters:
  - name: "domain"
    type: "string"
    description: "專案領域"
    required: true
    default: "web"
    validation:
      pattern: "^(web|mobile|desktop|api)$"
  - name: "complexity"
    type: "number"
    description: "需求複雜度 (1-5)"
    required: false
    default: 3
    validation:
      min: 1
      max: 5
```

### 支援的參數類型
- `string`：文字字串
- `number`：數值
- `boolean`：布林值
- `array`：陣列
- `object`：物件

### 驗證規則
- `required`：是否必填
- `default`：預設值
- `pattern`：正則表達式驗證（字串）
- `min/max`：數值範圍驗證
- `enum`：列舉值驗證

## 內容結構標準

### 章節組織
所有 prompt 文件必須包含以下標準章節：

1. **標題** (H1)
2. **目的** (H2)
3. **前提條件** (H2)
4. **執行流程** (H2)
5. **品質標準** (H2)
6. **使用範例** (H2)
7. **注意事項** (H2)
8. **相關資源** (H2)

### 格式規範

#### 程式碼區塊
```markdown
**輸入**：
```language
code here
```

**輸出**：
```language
result here
```
```

#### 清單項目
- 使用 `-` 作為無序清單
- 使用 `1. 2. 3.` 作為有序清單
- 巢狀清單使用適當的縮排

#### 強調格式
- **粗體**：重要概念
- *斜體*：強調
- `行內程式碼`：技術術語
- [連結](url)：參考資源

#### 表格格式
| 欄位 | 說明 | 範例 |
|------|------|------|
| 內容 | 說明 | 範例 |

## 分類與命名規範

### 目錄結構
```
prompt-repo/
├── requirements/          # 需求相關
│   ├── functional/        # 功能需求
│   ├── non-functional/    # 非功能需求
│   ├── user-stories/      # 使用者故事
│   └── acceptance-criteria/ # 驗收標準
├── design/               # 設計相關
├── implementation/       # 實作相關
├── testing/             # 測試相關
├── deployment/          # 部署相關
└── maintenance/         # 維護相關
```

### 檔案命名
- 使用 kebab-case：`user-story-creation.md`
- 包含主要功能：`requirements-gathering.md`
- 避免過長：最多 50 個字元

## 版本控制規範

### 版本號格式
遵循 [語意化版本](https://semver.org/)：
- `MAJOR.MINOR.PATCH`
- `1.0.0`：主要版本
- `1.1.0`：次要版本（新功能）
- `1.1.1`：修補版本（錯誤修正）

### 變更記錄
```markdown
## 變更記錄

### v1.1.0 (2024-01-15)
- 新增參數驗證功能
- 優化錯誤處理流程

### v1.0.0 (2024-01-01)
- 初始版本釋出
- 支援基本需求訪談功能
```

## 品質檢查清單

### 自動檢查
- [ ] Markdown 語法正確
- [ ] YAML frontmatter 有效
- [ ] 必要欄位完整
- [ ] 內部連結有效
- [ ] 檔案命名符合規範

### 人工審核
- [ ] 內容邏輯清晰
- [ ] 範例實用性高
- [ ] 說明文檔完整
- [ ] 分類適當
- [ ] 格式一致
  | 'docker-k8s'
  | 'serverless'
  | 'traditional'
  | 'pypi'
  | 'app-store'
  | 'static-hosting'
  | 'hybrid';

/** 資料儲存策略定義 */
export type DataStorageStrategy =
  | 'relational'
  | 'document'
  | 'key-value'
  | 'time-series'
  | 'object-storage'
  | 'graph'
  | 'in-memory';

/** 使用者需求輸入 */
export interface UserRequirements {
  id: string;
  rawInput: string;
  context: {
    domain: string;
    scale: 'small' | 'medium' | 'large' | 'enterprise';
    timeline: 'rush' | 'normal' | 'flexible';
    budget: 'low' | 'medium' | 'high';
    teamSize: number;
    existingTech?: string[];
  };
  constraints: RequirementConstraint[];
  preferences: UserPreference[];
  metadata: {
    language: SupportedLanguage;
    timestamp: Date;
    sessionId: string;
  };
}

/** 需求約束條件 */
export interface RequirementConstraint {
  type: 'technical' | 'business' | 'regulatory' | 'resource';
  category: string;
  description: string;
  priority: 'must' | 'should' | 'nice-to-have';
  impact: 'high' | 'medium' | 'low';
}

/** 使用者偏好設定 */
export interface UserPreference {
  category: 'technology' | 'architecture' | 'process' | 'tooling';
  preference: string;
  reason?: string;
  flexibility: 'fixed' | 'preferred' | 'flexible';
}

/** 支援的程式語言 */
export type SupportedLanguage = 'javascript' | 'typescript' | 'python' | 'java' | 'go' | 'rust';

/** 需求分析結果 */
export interface RequirementsAnalysis {
  projectType: ProjectType;
  confidence: number;
  reasoning: string[];
  extractedFeatures: FunctionalRequirement[];
  qualityAttributes: NonFunctionalRequirement[];
  risks: RiskAssessment[];
  recommendations: Recommendation[];
}

/** 功能需求定義 */
export interface FunctionalRequirement {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: 'high' | 'medium' | 'low';
  acceptanceCriteria: string[];
  dependencies: string[];
  estimatedEffort: 'small' | 'medium' | 'large';
}

/** 非功能需求定義 */
export interface NonFunctionalRequirement {
  category: 'performance' | 'security' | 'usability' | 'reliability' | 'maintainability' | 'scalability';
  attribute: string;
  value: string;
  measurement: string;
  priority: 'high' | 'medium' | 'low';
}

/** 風險評估 */
export interface RiskAssessment {
  id: string;
  category: 'technical' | 'business' | 'operational';
  description: string;
  probability: 'high' | 'medium' | 'low';
  impact: 'high' | 'medium' | 'low';
  mitigationStrategy: string;
}

/** 建議項目 */
export interface Recommendation {
  type: 'technology' | 'architecture' | 'process' | 'tool';
  item: string;
  reason: string;
  alternatives: string[];
  tradeoffs: string[];
}

/** 設計策略介面 */
export interface DesignStrategy {
  projectType: ProjectType;

  analyzeRequirements(requirements: UserRequirements): Promise<RequirementsAnalysis>;

  selectArchitecturePattern(analysis: RequirementsAnalysis): ArchitecturePattern;

  recommendTechnologyStack(analysis: RequirementsAnalysis): TechnologyStack;

  designDataStorage(analysis: RequirementsAnalysis): DataStorageStrategy;

  planDeployment(analysis: RequirementsAnalysis): DeploymentStrategy;

  generateDesignDocuments(analysis: RequirementsAnalysis): DesignDocument[];

  validateDesign(documents: DesignDocument[]): ValidationResult;
}

/** 設計文件定義 */
export interface DesignDocument {
  type: 'architecture' | 'dataflow' | 'interfaces' | 'database' | 'api' | 'deployment';
  title: string;
  content: string;
  format: 'markdown' | 'typescript' | 'yaml' | 'json' | 'mermaid';
  metadata: {
    version: string;
    generatedAt: Date;
    strategy: string;
    projectType: ProjectType;
  };
}

/** 驗證結果 */
export interface ValidationResult {
  isValid: boolean;
  score: number;
  issues: ValidationIssue[];
  recommendations: string[];
  compliance: ComplianceCheck[];
}

/** 驗證問題 */
export interface ValidationIssue {
  severity: 'error' | 'warning' | 'info';
  category: 'architecture' | 'security' | 'performance' | 'maintainability';
  description: string;
  location?: string;
  suggestion: string;
}

/** 合規性檢查 */
export interface ComplianceCheck {
  standard: string;
  requirement: string;
  status: 'pass' | 'fail' | 'not-applicable';
  evidence: string;
  notes?: string;
}

/** 技術棧評分 */
export interface TechnologyScore {
  technology: string;
  category: string;
  maturity: number;      // 0-1, 技術成熟度
  adoption: number;      // 0-1, 社群採用率
  fit: number;          // 0-1, 專案適配度
  teamFit: number;      // 0-1, 團隊適應度
  maintenance: number;  // 0-1, 維護成本
  futureProof: number;  // 0-1, 未來擴展性
  totalScore: number;
  reasoning: string[];
}

/** 架構模式實作 */
export interface ArchitectureImplementation {
  pattern: ArchitecturePattern;
  components: ComponentDefinition[];
  relationships: ComponentRelationship[];
  dataFlow: DataFlowDefinition[];
  deploymentUnits: DeploymentUnit[];
}

/** 元件定義 */
export interface ComponentDefinition {
  id: string;
  name: string;
  type: 'service' | 'module' | 'library' | 'infrastructure' | 'data-store';
  technology: string;
  responsibility: string;
  interfaces: InterfaceDefinition[];
  dependencies: string[];
}

/** 介面定義 */
export interface InterfaceDefinition {
  name: string;
  type: 'api' | 'event' | 'data' | 'ui';
  protocol?: string;
  schema?: any;
  authentication?: string;
}

/** 元件關係定義 */
export interface ComponentRelationship {
  from: string;
  to: string;
  type: 'depends' | 'calls' | 'publishes' | 'subscribes' | 'stores' | 'deploys';
  description: string;
  async: boolean;
}

/** 資料流程定義 */
export interface DataFlowDefinition {
  id: string;
  name: string;
  source: string;
  target: string;
  dataType: string;
  volume: 'low' | 'medium' | 'high';
  frequency: 'real-time' | 'batch' | 'on-demand';
  transformation?: string;
}

/** 部署單位定義 */
export interface DeploymentUnit {
  id: string;
  name: string;
  components: string[];
  environment: 'development' | 'staging' | 'production';
  scaling: ScalingConfiguration;
  monitoring: MonitoringConfiguration;
}

/** 擴展配置 */
export interface ScalingConfiguration {
  type: 'horizontal' | 'vertical' | 'auto';
  minInstances: number;
  maxInstances: number;
  targetMetrics: string[];
  cooldownPeriod: number;
}

/** 監控配置 */
export interface MonitoringConfiguration {
  metrics: string[];
  alerts: AlertRule[];
  logging: LoggingConfiguration;
  tracing: TracingConfiguration;
}

/** 告警規則 */
export interface AlertRule {
  metric: string;
  condition: 'gt' | 'lt' | 'eq' | 'ne';
  threshold: number;
  duration: number;
  severity: 'info' | 'warning' | 'error' | 'critical';
}

/** 日誌配置 */
export interface LoggingConfiguration {
  level: 'debug' | 'info' | 'warn' | 'error';
  format: 'json' | 'text';
  retention: number;
  aggregation: boolean;
}

/** 追蹤配置 */
export interface TracingConfiguration {
  enabled: boolean;
  sampling: number;
  exporter: string;
  tags: Record<string, string>;
}

/** 專案類型特定的設計工廠 */
export interface DesignStrategyFactory {
  createStrategy(projectType: ProjectType): DesignStrategy;
  getSupportedTypes(): ProjectType[];
  validateStrategy(strategy: DesignStrategy): boolean;
}

/** 智慧技術棧選擇器 */
export interface TechnologyStackSelector {
  analyzeRequirements(requirements: UserRequirements): Promise<RequirementsAnalysis>;
  generateCandidates(analysis: RequirementsAnalysis): TechnologyStack[];
  scoreCandidates(candidates: TechnologyStack[], analysis: RequirementsAnalysis): TechnologyScore[];
  selectOptimal(scores: TechnologyScore[]): TechnologyStack;
  validateCompatibility(stack: TechnologyStack): ValidationResult;
}

/** 設計文件生成器 */
export interface DesignDocumentGenerator {
  generateArchitectureDoc(implementation: ArchitectureImplementation): string;
  generateDataFlowDoc(dataFlows: DataFlowDefinition[]): string;
  generateInterfaceDoc(interfaces: InterfaceDefinition[]): string;
  generateDatabaseDoc(storage: DataStorageStrategy): string;
  generateApiDoc(endpoints: ApiEndpoint[]): string;
  generateDeploymentDoc(units: DeploymentUnit[]): string;
}

/** API 端點定義 */
export interface ApiEndpoint {
  path: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  description: string;
  parameters: ParameterDefinition[];
  requestBody?: SchemaDefinition;
  responses: ResponseDefinition[];
  authentication: boolean;
  rateLimit?: RateLimitDefinition;
}

/** 參數定義 */
export interface ParameterDefinition {
  name: string;
  type: string;
  required: boolean;
  description: string;
  location: 'path' | 'query' | 'header' | 'body';
  validation?: ValidationRule[];
}

/** 結構描述定義 */
export interface SchemaDefinition {
  type: string;
  properties?: Record<string, PropertyDefinition>;
  required?: string[];
  example?: any;
}

/** 屬性定義 */
export interface PropertyDefinition {
  type: string;
  description: string;
  required?: boolean;
  example?: any;
  validation?: ValidationRule[];
}

/** 驗證規則 */
export interface ValidationRule {
  rule: string;
  value: any;
  message: string;
}

/** 回應定義 */
export interface ResponseDefinition {
  statusCode: number;
  description: string;
  schema?: SchemaDefinition;
  headers?: Record<string, string>;
}

/** 速率限制定義 */
export interface RateLimitDefinition {
  requests: number;
  period: number;
  unit: 'second' | 'minute' | 'hour' | 'day';
}

/** 專案生成器 */
export interface ProjectGenerator {
  initialize(projectType: ProjectType, requirements: UserRequirements): Promise<ProjectStructure>;
  generateStructure(structure: ProjectStructure): Promise<void>;
  setupDependencies(stack: TechnologyStack): Promise<void>;
  createConfiguration(): Promise<void>;
  initializeTesting(): Promise<void>;
  setupDeployment(): Promise<void>;
}

/** 專案結構定義 */
export interface ProjectStructure {
  directories: DirectoryDefinition[];
  files: FileDefinition[];
  templates: TemplateDefinition[];
  scripts: ScriptDefinition[];
}

/** 目錄定義 */
export interface DirectoryDefinition {
  path: string;
  description: string;
  required: boolean;
}

/** 檔案定義 */
export interface FileDefinition {
  path: string;
  content: string;
  template?: string;
  executable?: boolean;
}

/** 模板定義 */
export interface TemplateDefinition {
  name: string;
  type: string;
  variables: Record<string, any>;
}

/** 腳本定義 */
export interface ScriptDefinition {
  name: string;
  command: string;
  description: string;
  phase: 'setup' | 'build' | 'test' | 'deploy';
}

/** 品質保證介面 */
export interface QualityAssurance {
  validateArchitecture(implementation: ArchitectureImplementation): ValidationResult;
  checkSecurityCompliance(stack: TechnologyStack): ValidationResult;
  assessPerformanceRequirements(requirements: NonFunctionalRequirement[]): ValidationResult;
  validateCodeQuality(files: FileDefinition[]): ValidationResult;
  generateTestStrategy(projectType: ProjectType): TestStrategy;
}

/** 測試策略 */
export interface TestStrategy {
  unitTests: TestDefinition[];
  integrationTests: TestDefinition[];
  e2eTests: TestDefinition[];
  performanceTests: TestDefinition[];
  securityTests: TestDefinition[];
  coverage: CoverageRequirement;
}

/** 測試定義 */
export interface TestDefinition {
  name: string;
  type: 'unit' | 'integration' | 'e2e' | 'performance' | 'security';
  framework: string;
  scope: string;
  priority: 'high' | 'medium' | 'low';
}

/** 覆蓋率要求 */
export interface CoverageRequirement {
  statements: number;
  branches: number;
  functions: number;
  lines: number;
}

/** 持續整合介面 */
export interface ContinuousIntegration {
  setupPipeline(projectType: ProjectType): PipelineDefinition;
  configureQualityGates(): QualityGate[];
  setupArtifactManagement(): ArtifactStrategy;
  configureDeploymentPipeline(): DeploymentPipeline;
}

/** 管線定義 */
export interface PipelineDefinition {
  stages: PipelineStage[];
  triggers: TriggerDefinition[];
  environment: EnvironmentDefinition[];
}

/** 管線階段 */
export interface PipelineStage {
  name: string;
  jobs: JobDefinition[];
  dependencies: string[];
}

/** 作業定義 */
export interface JobDefinition {
  name: string;
  steps: StepDefinition[];
  environment: string;
  timeout: number;
}

/** 步驟定義 */
export interface StepDefinition {
  name: string;
  action: string;
  parameters: Record<string, any>;
}

/** 觸發器定義 */
export interface TriggerDefinition {
  type: 'push' | 'pull-request' | 'schedule' | 'manual';
  branches?: string[];
  schedule?: string;
}

/** 環境定義 */
export interface EnvironmentDefinition {
  name: string;
  variables: Record<string, string>;
  secrets: string[];
}

/** 品質門檻 */
export interface QualityGate {
  metric: string;
  operator: 'gt' | 'lt' | 'eq' | 'ne';
  value: number;
  action: 'block' | 'warn' | 'allow';
}

/** 成品策略 */
export interface ArtifactStrategy {
  type: 'container' | 'package' | 'binary' | 'documentation';
  registry: string;
  retention: number;
  versioning: VersioningStrategy;
}

/** 版本策略 */
export interface VersioningStrategy {
  format: string;
  increment: 'major' | 'minor' | 'patch' | 'auto';
  metadata: string[];
}

/** 部署管線 */
export interface DeploymentPipeline {
  environments: DeploymentEnvironment[];
  promotion: PromotionStrategy;
  rollback: RollbackStrategy;
}

/** 部署環境 */
export interface DeploymentEnvironment {
  name: string;
  type: 'development' | 'staging' | 'production';
  approval: boolean;
  tests: string[];
}

/** 升級策略 */
export interface PromotionStrategy {
  automatic: boolean;
  criteria: string[];
  schedule?: string;
}

/** 回滾策略 */
export interface RollbackStrategy {
  automatic: boolean;
  timeout: number;
  backup: boolean;
}