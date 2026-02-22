import React, { useEffect, useRef } from "react";
import mermaid from "mermaid";

/* -------------------- Mermaid Init (Run Once) -------------------- */
let isMermaidInitialized = false;

const initializeMermaid = () => {
  if (!isMermaidInitialized) {
    mermaid.initialize({
      startOnLoad: false,
      theme: "default",
      securityLevel: "loose",
    });
    isMermaidInitialized = true;
  }
};

/* -------------------- Clean Diagram -------------------- */
const cleanMermaidChart = (diagram) => {
  if (!diagram) return "";

  let clean = diagram.replace(/\r\n/g, "\n").trim();

  if (!clean.startsWith("graph")) {
    clean = `graph TD\n${clean}`;
  }

  return clean;
};

/* -------------------- Auto Fix Bad Nodes -------------------- */
const autoFixBadNodes = (diagram) => {
  let index = 0;

  return diagram.replace(/\[(.*?)]/g, (_, label) => {
    index++;

    const safeLabel = label.replace(/"/g, '\\"');

    return `N${index}["${safeLabel}"]`;
  });
};

/* -------------------- Mermaid Component -------------------- */
function MermaidSetup({ diagram }) {
  const containerRef = useRef(null);

  useEffect(() => {
    initializeMermaid();

    if (!diagram || !containerRef.current) return;

    let isMounted = true;

    const renderDiagram = async () => {
      try {
        containerRef.current.innerHTML = "";

        const uniqueId = `mermaid-${Math.random()
          .toString(36)
          .substring(2, 9)}`;

        const safeChart = autoFixBadNodes(
          cleanMermaidChart(diagram)
        );

        const { svg } = await mermaid.render(uniqueId, safeChart);

        if (isMounted && containerRef.current) {
          containerRef.current.innerHTML = svg;
        }
      } catch (error) {
        console.error("Error rendering Mermaid diagram:", error);

        if (containerRef.current) {
          containerRef.current.innerHTML =
            "<p style='color:red;'>Failed to render diagram</p>";
        }
      }
    };

    renderDiagram();

    return () => {
      isMounted = false;
    };
  }, [diagram]);

  return (
    <div className="bg-white border rounded-lg p-4 overflow-x-auto">
      <div ref={containerRef} />
    </div>
  );
}

export default MermaidSetup;