/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        inter: ['Inter', 'system-ui', 'sans-serif'],
        poppins: ['Poppins', 'system-ui', 'sans-serif'],
        quicksand: ['Quicksand', 'system-ui', 'sans-serif'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        success: {
          50: "#f0fdf4",
          100: "#dcfce7",
          500: "#22c55e",
          600: "#16a34a",
          foreground: "hsl(var(--background))",
        },
        warning: {
          50: "#fffbeb",
          100: "#fef3c7",
          500: "#f59e0b",
          600: "#d97706",
          foreground: "hsl(var(--background))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Enhanced color palette
        "soft-periwinkle": "#D0D4F9",
        "surface-white": "#F8FAFF",
        "deep-indigo": "#0F1423",
        "accent-blue": "#7B91C9",
        "accent-lavender": "#9F9BC8",
        "signal-purple": "#6665A2",
        mint: "#B8E1DD",
        "soft-coral": "#F3BDB5",
        sand: "#E8DBC5",
        mist: "#DADBE9",
        slate: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 4px)",
        sm: "calc(var(--radius) - 8px)",
        xl: "calc(var(--radius) + 4px)",
        "2xl": "calc(var(--radius) + 8px)",
      },
      boxShadow: {
        "periwinkle-sm": "0 2px 4px 0 rgba(208, 212, 249, 0.15)",
        "periwinkle-md": "0 4px 8px -2px rgba(208, 212, 249, 0.2), 0 2px 4px -1px rgba(208, 212, 249, 0.1)",
        "periwinkle-lg": "0 10px 20px -5px rgba(208, 212, 249, 0.25), 0 4px 8px -2px rgba(208, 212, 249, 0.1)",
        "periwinkle-xl": "0 20px 40px -10px rgba(208, 212, 249, 0.3), 0 8px 16px -4px rgba(208, 212, 249, 0.1)",
        "blue-sm": "0 2px 4px 0 rgba(123, 145, 201, 0.15)",
        "blue-md": "0 4px 8px -2px rgba(123, 145, 201, 0.2), 0 2px 4px -1px rgba(123, 145, 201, 0.1)",
        "glow": "0 0 20px rgba(123, 145, 201, 0.3)",
        "inner": "inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        "pulse-colors": {
          "0%, 100%": { backgroundColor: "#D0D4F9" },
          "25%": { backgroundColor: "#7B91C9" },
          "50%": { backgroundColor: "#9F9BC8" },
          "75%": { backgroundColor: "#DADBE9" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-up": {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "bounce-gentle": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-2px)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulse-colors": "pulse-colors 8s infinite",
        "fade-in": "fade-in 0.3s ease-out",
        "slide-up": "slide-up 0.4s ease-out",
        "scale-in": "scale-in 0.2s ease-out",
        "shimmer": "shimmer 2s infinite",
        "bounce-gentle": "bounce-gentle 2s infinite",
      },
      backgroundImage: {
        "gradient-periwinkle": "linear-gradient(135deg, #D0D4F9, #9F9BC8)",
        "gradient-blue-lavender": "linear-gradient(135deg, #7B91C9, #9F9BC8)",
        "gradient-nav": "linear-gradient(180deg, #F8FAFF, #D0D4F9)",
        "gradient-card": "linear-gradient(145deg, #ffffff, #f8fafc)",
        "shimmer-gradient": "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}