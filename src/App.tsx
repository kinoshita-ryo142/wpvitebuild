import React, { useState, useRef } from 'react';
import type { ComponentType, MouseEventHandler } from 'react';
import { 
  FileCode, 
  Settings, 
  ArrowRight, 
  ArrowDown, 
  Package, 
  Zap, 
  Layers, 
  Globe, 
  Code,
  FileType,
  RefreshCw,
  Info,
  Eye
} from 'lucide-react';
import BackToTop from './components/ui/back-to-top';
import { SpeedInsights } from "@vercel/speed-insights/react"

type WorkflowStepProps = {
  title: string;
  icon: ComponentType<{ size?: number; className?: string }>;
  color: string;
  isActive?: boolean;
  onClick?: MouseEventHandler<HTMLDivElement>;
  description?: string;
};

const WorkflowStep = ({ title, icon: Icon, color, isActive, onClick, description }: WorkflowStepProps) => (
  <div 
    onClick={onClick}
    className={`
      relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ease-in-out
      flex flex-col items-center gap-3 min-w-[140px] shadow-sm hover:shadow-md
      ${isActive 
        ? `border-${color}-500 bg-${color}-50 scale-105 ring-2 ring-${color}-200` 
        : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'}
    `}
  >
    <div className={`p-3 rounded-full bg-${color}-100 text-${color}-600`}>
      <Icon size={24} />
    </div>
    <div className="text-center">
      <h3 className="font-bold text-slate-700 text-sm md:text-base">{title}</h3>
      <p className="text-xs text-slate-500 mt-1 line-clamp-2 hidden md:block">{description}</p>
    </div>
    {isActive && (
      <div className={`absolute -bottom-2 w-4 h-4 bg-${color}-50 border-r-2 border-b-2 border-${color}-500 rotate-45`}></div>
    )}
  </div>
);

type ConnectionProps = { active?: boolean };
const Connection = ({ active }: ConnectionProps) => (
  <div className="hidden md:flex flex-1 items-center justify-center px-2 text-slate-300">
    <ArrowRight size={24} className={active ? "text-slate-600 animate-pulse" : ""} />
  </div>
);

const MobileConnection: React.FC = () => (
  <div className="md:hidden flex justify-center py-2 text-slate-300">
    <ArrowDown size={24} />
  </div>
);

type StepData = {
  title: string;
  description?: string;
  icon: ComponentType<{ size?: number; className?: string }>;
  color: string;
  longDescription?: string;
  points: string[];
  fileExample: { name: string; code: string };
};

type StepsMap = Record<string, StepData>;

type DetailPanelProps = {
  activeStep?: string | null;
  data?: StepsMap;
};

const DetailPanel = React.forwardRef<HTMLDivElement, DetailPanelProps>(({ activeStep, data }, ref) => {
  if (!activeStep || !data) return (
    <div ref={ref} className="mt-8 p-8 bg-slate-50 rounded-xl border border-dashed border-slate-300 text-center text-slate-400">
      <Info className="inline-block mb-2" size={32} />
      <p>上の各ステップをクリックして詳細を確認してください</p>
    </div>
  );
  const stepData = data[activeStep];

  const Icon = stepData.icon;

  return (
    <div ref={ref} className="mt-8 bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-top-4 duration-300">
      <div className={`bg-${stepData.color}-500 text-white p-4 flex items-center gap-3`}>
        <Icon size={24} />
        <h2 className="text-xl font-bold">{stepData.title}</h2>
      </div>
      <div className="p-6 grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="font-bold text-slate-700 mb-3 flex items-center gap-2">
            <Info size={18} /> 概要
          </h3>
          <p className="text-slate-600 leading-relaxed text-sm md:text-base mb-4">
            {stepData.longDescription}
          </p>
          
          <h3 className="font-bold text-slate-700 mb-3 flex items-center gap-2">
            <Settings size={18} /> 主な役割・設定
          </h3>
          <ul className="space-y-2">
            {stepData.points.map((point, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                <span className={`mt-1.5 w-1.5 h-1.5 rounded-full bg-${stepData.color}-500 flex-shrink-0`}></span>
                {point}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-slate-900 rounded-lg p-4 font-mono text-sm text-slate-300 overflow-x-auto">
          <div className="flex items-center gap-2 border-b border-slate-700 pb-2 mb-3 text-slate-400">
            <FileCode size={16} />
            <span>{stepData.fileExample.name}</span>
          </div>
          <pre className="whitespace-pre-wrap">
            <code>{stepData.fileExample.code}</code>
          </pre>
        </div>
      </div>
    </div>
  );
});

export default function WPViteWorkflow() {
  const [activeStep, setActiveStep] = useState('wordpress'); // 変更点が見やすいようにデフォルトを変更
  const detailRef = useRef<HTMLDivElement | null>(null);

  const handleSelect = (id: string) => {
    setActiveStep(id);
    // 少し遅延して DOM 更新後にスクロール
    setTimeout(() => {
      detailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 120);
  };

  const steps: StepsMap = {
    env: {
      title: "環境構築",
      description: "Node.js & npmによるパッケージ管理",
      icon: Package,
      color: "red",
      longDescription: "WordPressテーマ開発の基盤です。ローカル環境にNode.jsをインストールし、package.jsonファイルで開発に必要なツール（Vite, Tailwind, TypeScriptなど）の依存関係を管理します。",
      points: [
        "npm init でプロジェクト初期化",
        "devDependenciesにビルドツールを追加",
        "npm scripts (dev, build) の定義"
      ],
      fileExample: {
        name: "package.json",
        code: `{
  "name": "myProjectName",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4.1.17",
    "@types/aos": "^3.0.7",
    "@types/node": "^24.10.1",
    "autoprefixer": "^10.4.22",
    "postcss": "^8.5.6",
    "sass": "^1.94.1",
    "sass-embedded": "^1.93.3",
    "typescript": "^5.9.3",
    "vite": "^7.2.2"
  },
  "dependencies": {
    "@tailwindcss/vite": "^4.1.17",
    "aos": "^2.3.4",
    "tailwindcss": "^4.1.17"
  }
}
`
      }
    },
    source: {
      title: "ソースコード",
      description: "TS, CSS, PHP (Template)",
      icon: Code,
      color: "blue",
      longDescription: "開発者が編集するファイル群です。TypeScriptでロジックを書き、CSSファイルでTailwindを読み込みます。開発中はこれらのファイルを編集し、Viteがそれを即座に処理します。",
      points: [
        "src/style.css (@import syntax)",
        "src/main.ts (ロジック)",
        "**/*.php (マークアップとクラス指定)",
        "開発者はここでclassを追記する"
      ],
      fileExample: {
        name: "src/style.css",
        code: `@import "tailwindcss";

@theme {
  --color-primary: #3b82f6;
}

/* PHPファイル側でユーティリティクラスを使うため、
  ここにはカスタムCSSをほとんど書く必要がありません。
*/`
      }
    },
    build: {
      title: "Vite (ビルド)",
      description: "コンパイル & バンドル処理",
      icon: Zap,
      color: "purple",
      longDescription: "ご提示の設定ファイルに基づきビルドプロセスを構成します。`root: 'src'`としているためソースディレクトリがルートとなり、出力は親階層の`dist`に行われます。CSSやJSのファイル名は固定化されています。",
      points: [
        "root: 'src' (ソースディレクトリ起点)",
        "outDir: '../dist' (親階層に出力)",
        "assetFileNames関数でCSS名を固定",
        "CORS & Origin設定 (Devサーバー)"
      ],
      fileExample: {
        name: "vite.config.ts",
        code: `import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  root: 'src',
  server: {
    cors: true,
    origin: 'http://localhost:5173',
  },
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'src/main.ts'),
      },
      output: {
        entryFileNames: 'main.js',
        assetFileNames: (assetInfo) => {
          const candidate = (assetInfo as any).name ?? (assetInfo as any).fileName ?? '';
          if ((candidate as string).endsWith('.css')) {
            return 'style.css';
          }
          return '[name].[ext]';
        },
      },
    },
  }
});`
      }
    },
    postcss: {
      title: "即時生成とファイル監視",
      description: "PHP監視 & CSS生成",
      icon: Eye, 
      color: "cyan",
      longDescription: "ここがTailwind CSSの強力な仕組みです。エンジンはCSSファイルだけでなく、テーマ内の全てのPHPファイルを常に監視しています。あなたがPHPファイルに新しいクラスを書いて保存すると、その瞬間だけに必要なCSSを生成し、ブラウザに注入します。",
      points: [
        "**/*.php ファイルの変更を常時監視",
        "保存時に使用されたクラス名を即座に抽出",
        "必要なCSSだけを生成・更新",
        "HMRによりリロードなしで反映"
      ],
      fileExample: {
        name: "header.php (監視対象)",
        code: `<!-- PHPファイルを編集して保存すると... -->
<header class="bg-white shadow-md p-4">
  
  <!-- ↓ 新しくクラスを追加して保存！ -->
  <h1 class="text-3xl font-bold text-blue-600 hover:text-blue-800">
    <?php bloginfo('name'); ?>
  </h1>

</header>
<!-- 
  Viteがこの変更を検知し、
  'text-3xl', 'text-blue-600' 等のCSSを
  即座に生成してブラウザに送ります。
-->`
      }
    },
    output: {
      title: "出力 (Dist)",
      description: "固定ファイル名の生成",
      icon: FileType,
      color: "emerald",
      longDescription: "ビルドの結果、distフォルダに出力されるファイル群です。設定によりファイル名が固定されているため、毎回同じ名前で上書きされます。manifest.jsonは生成されません。",
      points: [
        "dist/main.js (バンドル済みJS)",
        "dist/style.css (生成されたCSS)",
        "ハッシュ値なしのシンプルな構成",
        "manifest.json は無し"
      ],
      fileExample: {
        name: "フォルダ構成",
        code: `my-wp-theme/
├── dist/
│   ├── main.js
│   └── style.css
├── src/
├── main.css
└── main.ts`
      }
    },
    wordpress: {
      title: "WordPress",
      description: "WP_DEBUGによる分岐と読み込み",
      icon: Globe,
      color: "slate",
      longDescription: "functions.phpにて、wp-config.phpの`WP_DEBUG` 定数の値を判定し、読み込みリソースを切り替えます。True（開発中）の場合はVite開発サーバーへ接続してHMRを有効にし、False（本番）の場合はdistフォルダの最適化されたファイルを読み込みます。また、ViteのアセットはESモジュールとして読み込むため、scriptタグの属性変更も行います。",
      points: [
        "WP_DEBUGが「true」なら localhost:5173",
        "WP_DEBUGが「false」なら distファイルを読み込み",
        "scriptタグに type=\"module\" を自動付与",
        "wp_enqueue_scripts アクションで実行"
      ],
      fileExample: {
        name: "functions.php",
        code: `function mytheme_enqueue_scripts() {
    if (defined('WP_DEBUG') && WP_DEBUG) {
        // Vite開発サーバー用 (HMR有効)
        wp_register_script(
            'vite-client',
            'http://localhost:5173/@vite/client',
            [],
            null
        );
        wp_enqueue_script('vite-client');

        wp_register_script(
            'vite-main',
            'http://localhost:5173/main.ts',
            [],
            null
        );
        wp_enqueue_script('vite-main');
    } else {
        // 本番用 (ビルド済みファイル)
        wp_enqueue_style('mytheme-style', get_template_directory_uri() . '/dist/style.css');
        wp_register_script(
            'mytheme-main',
            get_template_directory_uri() . '/dist/main.js',
            [],
            null
        );
        wp_enqueue_script('mytheme-main');
    }
}
add_action('wp_enqueue_scripts', 'mytheme_enqueue_scripts');

// <script type="module"> に置換する処理
function add_module_type_to_vite_scripts($tag, $handle) {
    $vite_handles = [
        'vite-client',
        'vite-main',
        'mytheme-main'
    ];

    if (in_array($handle, $vite_handles, true)) {
        $tag = str_replace('<script ', '<script type="module" ', $tag);
    }
    return $tag;
}
add_filter('script_loader_tag', 'add_module_type_to_vite_scripts', 10, 2);`
      }
    }
  };

  const StepComponent: React.FC<{ id: string }> = ({ id }) => (
    <WorkflowStep 
      {...steps[id]} 
      isActive={activeStep === id} 
      onClick={() => handleSelect(id)} 
    />
  );

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-slate-800">
      <div className="max-w-5xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">WordPressテーマ開発ワークフロー</h1>
          <p className="text-slate-500">Node.js, Vite, Tailwind CSS (v4) - シンプル構成</p>
        </header>
        <SpeedInsights/>

        {/* Workflow Diagram Area */}
        <div className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-slate-200 overflow-x-auto">
          
          {/* Top Row: Environment & Config */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-4 md:mb-12">
             <StepComponent id="env" />
          </div>

          <div className="flex justify-center mb-4 md:mb-0">
             <MobileConnection />
             <div className="hidden md:block h-12 border-l-2 border-dashed border-slate-300"></div>
          </div>

          {/* Main Flow: Source -> Process -> Output */}
          <div className="flex flex-col md:flex-row items-stretch justify-between gap-4 relative mt-4">
            
            {/* Group: Source */}
            <div className="flex flex-col gap-4 flex-1">
              <div className="text-center font-bold text-slate-400 uppercase tracking-wider mb-2">開発</div>
              <StepComponent id="source" />
            </div>

            <Connection active={true} />

            {/* Group: Build Process */}
            <div className="flex flex-col gap-4 flex-1">
              <div className="text-center font-bold text-slate-400 uppercase tracking-wider mb-2">ビルド</div>
              <div className="bg-purple-50 rounded-xl p-4 border border-purple-100 flex flex-col gap-4">
                <StepComponent id="build" />
                <div className="flex justify-center text-purple-300"><ArrowDown size={20} /></div>
                <StepComponent id="postcss" />
              </div>
            </div>

            <Connection active={true} />

            {/* Group: Production */}
            <div className="flex flex-col gap-4 flex-1">
              <div className="text-center font-bold text-slate-400 uppercase tracking-wider mb-2">本公開</div>
              <StepComponent id="output" />
              <div className="flex justify-center text-slate-300"><ArrowDown size={20} /></div>
              <StepComponent id="wordpress" />
            </div>

          </div>
        </div>

        {/* Details Area */}
        <DetailPanel ref={detailRef} activeStep={activeStep} data={steps} />

        {/* Footer Notes */}
        <div className="mt-12 grid md:grid-cols-3 gap-4 text-xs text-slate-500">
          <div className="bg-white p-4 rounded-lg border border-slate-200">
            <h4 className="font-bold mb-1 flex items-center gap-1"><RefreshCw size={14}/> HMR (Hot Module Replacement)</h4>
            Viteを使用する最大のメリットです。`npm run dev`実行中は、ソースコードを変更するとブラウザをリロードせずに瞬時に変更が反映されます。
          </div>
          <div className="bg-white p-4 rounded-lg border border-slate-200">
            <h4 className="font-bold mb-1 flex items-center gap-1"><FileType size={14}/> 固定ファイル名運用</h4>
            manifest.jsonを使用せず、`dist/style.css`のように固定名で出力することで、WordPress側の読み込みコードをシンプルに保てます。
          </div>
          <div className="bg-white p-4 rounded-lg border border-slate-200">
            <h4 className="font-bold mb-1 flex items-center gap-1"><Layers size={14}/> JIT / Rust Engine</h4>
            Tailwind CSS v4はRustエンジンにより高速化され、PHPやTSファイルをスキャンして必要なクラスのみをCSSに出力します。
          </div>
        </div>
      </div>
    <BackToTop />
    </div>
  );
}