const globalConfigs = require('@browserstack/tailwind-config');

const bifrostTailwindConfig = {
  ...globalConfigs.globalTailwindConfig,
  content: ['./modules/**/*.{js,jsx}'],
};

bifrostTailwindConfig.theme.configViewer = {
  themeReplacements: {
    'var(--colors-base-50)': '#f9fafb',
    'var(--colors-base-100)': '#f3f4f6',
    'var(--colors-base-200)': '#e5e7eb',
    'var(--colors-base-300)': '#d1d5db',
    'var(--colors-base-400)': '#9ca3af',
    'var(--colors-base-500)': '#6b7280',
    'var(--colors-base-600)': '#4b5563',
    'var(--colors-base-700)': '#374151',
    'var(--colors-base-800)': '#1f2937',
    'var(--colors-base-900)': '#111827',

    'var(--colors-brand-50)': '#eff6ff',
    'var(--colors-brand-100)': '#dbeafe',
    'var(--colors-brand-200)': '#bfdbfe',
    'var(--colors-brand-300)': '#93c5fd',
    'var(--colors-brand-400)': '#60a5fa',
    'var(--colors-brand-500)': '#3b82f6',
    'var(--colors-brand-600)': '#2563eb',
    'var(--colors-brand-700)': '#1d4ed8',
    'var(--colors-brand-800)': '#1e40af',
    'var(--colors-brand-900)': '#1e3a8a',

    'var(--colors-danger-50)': '#fef2f2',
    'var(--colors-danger-100)': '#fee2e2',
    'var(--colors-danger-200)': '#fecaca',
    'var(--colors-danger-300)': '#fca5a5',
    'var(--colors-danger-400)': '#f87171',
    'var(--colors-danger-500)': '#ef4444',
    'var(--colors-danger-600)': '#dc2626',
    'var(--colors-danger-700)': '#b91c1c',
    'var(--colors-danger-800)': '#991b1b',
    'var(--colors-danger-900)': '#7f1d1d',

    'var(--colors-success-50)': '#ecfdf5',
    'var(--colors-success-100)': '#d1fae5',
    'var(--colors-success-200)': '#a7f3d0',
    'var(--colors-success-300)': '#6ee7b7',
    'var(--colors-success-400)': '#34d399',
    'var(--colors-success-500)': '#10b981',
    'var(--colors-success-600)': '#059669',
    'var(--colors-success-700)': '#047857',
    'var(--colors-success-800)': '#065f46',
    'var(--colors-success-900)': '#064e3b',

    'var(--colors-attention-50)': '#fffbeb',
    'var(--colors-attention-100)': '#fef3c7',
    'var(--colors-attention-200)': '#fde68a',
    'var(--colors-attention-300)': '#fcd34d',
    'var(--colors-attention-400)': '#fbbf24',
    'var(--colors-attention-500)': '#f59e0b',
    'var(--colors-attention-600)': '#d97706',
    'var(--colors-attention-700)': '#b45309',
    'var(--colors-attention-800)': '#92400e',
    'var(--colors-attention-900)': '#78350f',

    'var(--colors-info-50)': '#f0f9ff',
    'var(--colors-info-100)': '#e0f2fe',
    'var(--colors-info-200)': '#bae6fd',
    'var(--colors-info-300)': '#7dd3fc',
    'var(--colors-info-400)': '#38bdf8',
    'var(--colors-info-500)': '#0ea5e9',
    'var(--colors-info-600)': '#0284c7',
    'var(--colors-info-700)': '#0369a1',
    'var(--colors-info-800)': '#075985',
    'var(--colors-info-900)': '#0c4a6e',
  },
};

module.exports = bifrostTailwindConfig;
