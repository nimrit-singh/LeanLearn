
// Mapping for common scientific terms to LaTeX
const latexReplacements: { [key: string]: string } = {
  integral: "\\int",
  sum: "\\sum",
  sqrt: "\\sqrt",
  sin: "\\sin",
  cos: "\\cos",
  tan: "\\tan",
  log: "\\log",
  alpha: "\\alpha",
  beta: "\\beta",
  gamma: "\\gamma",
  theta: "\\theta",
  pi: "\\pi",
  delta: "\\delta",
  sigma: "\\sigma",
  det: "\\det", // Determinants
};

// Function to convert user input into LaTeX
export const convertToLatex = (text: string): string => {
  let latex = text;

  // Replace scientific terms (like "integral" with "\int")
  for (const [key, value] of Object.entries(latexReplacements)) {
    latex = latex.replace(new RegExp(`\\b${key}\\b`, "g"), value);
  }

  // Convert "a/b" to "\frac{a}{b}" (fractions)
  latex = latex.replace(/(\w+)\/(\w+)/g, "\\frac{$1}{$2}");

  // Convert "x^y" to "{x^{y}}" (exponents)
  latex = latex.replace(/(\w+)\^(\w+)/g, "{$1^{$2}}");

  // Convert "sqrt(x)" to "\sqrt{x}"
  latex = latex.replace(/sqrt\(([^)]+)\)/g, "\\sqrt{$1}");

  // Convert "d/dx f(x)" to "\frac{d}{dx} f(x)" (derivatives)
  latex = latex.replace(/d\/dx\s*(\w+)/g, "\\frac{d}{dx} $1");

  // Convert "lim x->0 f(x)" to "\lim\limits_{x \to 0} f(x)" (limits)
  latex = latex.replace(/lim\s*(\w+)->(\w+)/g, "\\lim\\limits_{$1 \\to $2}");

  // Convert vector notation "|v|" to "\|v\|" (vector magnitude)
  latex = latex.replace(/\|(\w+)\|/g, "\\|$1\\|");

  // Convert "a . b" to "\mathbf{a} \cdot \mathbf{b}" (dot product)
  latex = latex.replace(/(\w+)\s*\.\s*(\w+)/g, "\\mathbf{$1} \\cdot \\mathbf{$2}");

  // Convert "a x b" to "\mathbf{a} \times \mathbf{b}" (cross product)
  latex = latex.replace(/(\w+)\s*x\s*(\w+)/g, "\\mathbf{$1} \\times \\mathbf{$2}");

  // Convert matrix format "[a, b; c, d]" to LaTeX matrix
  latex = latex.replace(/\[([\d\w\s,;]+)\]/g, (match) => {
    const rows = match
      .replace(/\[|\]/g, "") // Remove brackets
      .split(";") // Split rows by semicolon
      .map((row) => row.trim().replace(/,\s*/g, " & ")) // Format rows for LaTeX
      .join(" \\\\ "); // Separate rows

    return `\\begin{bmatrix} ${rows} \\end{bmatrix}`;
  });

  return latex;
};

