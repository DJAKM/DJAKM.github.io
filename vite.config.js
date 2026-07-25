import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"

export default {
  plugins: [react(), tailwindcss()],
  // Build straight into docs/ so GitHub Pages can serve it from "main /docs"
  build: { outDir: "docs", emptyOutDir: true },
}
