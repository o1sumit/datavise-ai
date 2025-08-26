import { Brain, GitBranch, Workflow, Zap, Shield, Database } from "lucide-react";
import { useState } from "react";

const AIArchitectureSection = () => {
  const [activeWorkflow, setActiveWorkflow] = useState(0);

  const workflows = [
    {
      title: "Primary Workflow",
      subtitle: "AIAgentService",
      icon: Brain,
      steps: ["Plan", "Execute", "Analyze"],
      color: "primary",
      features: [
        "Multi-step planning with JSON schema validation",
        "Tool selection from 3 types: db_query, compute_statistics, llm_analysis",
        "Intelligent query generation for MongoDB, PostgreSQL, and MySQL",
        "Fallback mechanisms when planning fails"
      ]
    },
    {
      title: "LangGraph State Machine",
      subtitle: "DatabaseAgentService",
      icon: GitBranch,
      steps: ["Analyze", "Load Context", "Plan", "Execute", "Response"],
      color: "accent",
      features: [
        "5-node workflow with state management",
        "State reducers for different data channels",
        "Dynamic tool creation with safety guardrails",
        "Confidence scoring and follow-up generation"
      ]
    }
  ];

  const architectureNodes = [
    { name: "Analyze_Query", position: { x: 100, y: 50 }, type: "input" },
    { name: "Load_Context", position: { x: 300, y: 50 }, type: "process" },
    { name: "Plan_Execution", position: { x: 500, y: 50 }, type: "decision" },
    { name: "Execute_Tools", position: { x: 700, y: 50 }, type: "action" },
    { name: "Generate_Response", position: { x: 900, y: 50 }, type: "output" }
  ];

  return (
    <section className="py-16 px-6 relative overflow-hidden bg-gradient-to-b from-muted/10 to-background">
      {/* Background Effects */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 mb-6 glass-card px-6 py-3 rounded-full">
            <Brain className="w-6 h-6 text-primary animate-pulse" />
            <span className="text-sm font-medium text-primary">Advanced AI Architecture</span>
          </div>

          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Dual Workflow
            <span className="block gradient-text">AI System</span>
          </h2>

          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Revolutionary dual-brain architecture combining strategic planning with state-managed execution
            for unparalleled database intelligence and safety.
          </p>
        </div>

        {/* Workflow Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          {workflows.map((workflow, index) => (
            <div
              key={index}
              className={`glass-card p-8 rounded-3xl cursor-pointer transition-all duration-500 hover-glow group ${activeWorkflow === index ? 'ring-2 ring-primary/50 shadow-glow scale-105' : ''
                }`}
              onMouseEnter={() => setActiveWorkflow(index)}
            >
              {/* Workflow Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-16 h-16 bg-gradient-${workflow.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <workflow.icon className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">{workflow.title}</h3>
                  <p className="text-muted-foreground">{workflow.subtitle}</p>
                </div>
              </div>

              {/* Workflow Steps */}
              <div className="flex items-center justify-between mb-6 p-4 bg-muted/10 rounded-xl">
                {workflow.steps.map((step, stepIndex) => (
                  <div key={stepIndex} className="flex items-center justify-center flex-col">
                    <div className={`w-10 h-10 rounded-full bg-gradient-${workflow.color} flex items-center justify-center text-primary-foreground text-sm font-bold text-white gap-4`}>
                      {stepIndex + 1}
                    </div>
                    <div className="ml-2 text-sm font-medium">{step}</div>
                    {stepIndex < workflow.steps.length - 1 && (
                      <Zap className="w-4 h-4 text-muted-foreground mx-3" />
                    )}
                  </div>
                ))}
              </div>

              {/* Features */}
              <div className="space-y-3">
                {workflow.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-gradient-primary rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">{feature}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* LangGraph State Architecture */}
        <div className="glass-card p-8 rounded-3xl mb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">LangGraph State Machine</h3>
            <p className="text-muted-foreground">
              Advanced state management with channel reducers and dynamic tool creation
            </p>
          </div>

          {/* State Graph Visualization */}
          <div className="relative bg-muted/5 rounded-2xl p-8 mb-8 overflow-hidden">
            <div className="flex items-center justify-between relative">
              {architectureNodes.map((node, index) => (
                <div key={index} className="relative">
                  <div className={`w-20 h-20 rounded-xl flex items-center justify-center font-bold text-sm text-center leading-tight
                    ${node.type === 'input' ? 'bg-gradient-primary text-white' :
                      node.type === 'output' ? 'bg-gradient-accent text-white' :
                        'bg-gradient-muted text-muted-foreground'} 
                    hover:scale-110 transition-transform cursor-pointer shadow-glow`}>
                    {node.name.replace('_', ' ')}
                  </div>
                  {index < architectureNodes.length - 1 && (
                    <div className="absolute top-1/2  h-0.5 bg-gradient-primary cus-width-wrap" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* State Channels */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "Messages", type: "Array Concat", description: "Chat history and context preservation" },
              { name: "Context", type: "Object Merge", description: "Database schema and connection state" },
              { name: "Tools", type: "Last Value", description: "Dynamic tool selection and execution" }
            ].map((channel, index) => (
              <div key={index} className="border border-border/50 bg-muted/5 rounded-xl p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Database className="w-5 h-5 text-primary" />
                  <h4 className="font-semibold">{channel.name}</h4>
                </div>
                <div className="code-block p-2 rounded text-xs mb-2">{channel.type}</div>
                <p className="text-sm text-muted-foreground">{channel.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Code Example */}
        <div className="glass-card p-8 rounded-3xl">
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <Workflow className="w-6 h-6 text-primary" />
            State Graph Implementation
          </h3>

          <div className="code-block p-6 rounded-2xl font-mono text-sm overflow-x-auto">
            <div className="text-syntax-comment">// State Graph Architecture</div>
            <div><span className="text-syntax-keyword">const</span> <span className="text-syntax-variable">graph</span> = <span className="text-syntax-keyword">new</span> <span className="text-syntax-class">StateGraph</span>&lt;<span className="text-syntax-type">AgentState</span>&gt;({'{'}
              <div className="ml-4">
                <span className="text-syntax-property">channels</span>: {'{'}
                <div className="ml-4">
                  <div><span className="text-syntax-property">messages</span>: {'{'} <span className="text-syntax-property">reducer</span>: <span className="text-syntax-function">(x, y) =&gt;</span> x.<span className="text-syntax-method">concat</span>(y) {'}'},</div>
                  <div><span className="text-syntax-property">currentQuery</span>: {'{'} <span className="text-syntax-property">reducer</span>: <span className="text-syntax-function">(x, y) =&gt;</span> y ?? x {'}'},</div>
                  <div><span className="text-syntax-property">context</span>: {'{'} <span className="text-syntax-property">reducer</span>: <span className="text-syntax-function">(x, y) =&gt;</span> ({'{'}<span className="text-syntax-operator">...x</span>, <span className="text-syntax-operator">...y</span>{'}'}) {'}'},</div>
                  <div><span className="text-syntax-property">tools</span>: {'{'} <span className="text-syntax-property">reducer</span>: <span className="text-syntax-function">(x, y) =&gt;</span> y ?? x {'}'},</div>
                </div>
                {'}'}
              </div>
            </div>
            {'}'})
          </div>
        </div>
      </div>
    </section>

  );
};

export default AIArchitectureSection;