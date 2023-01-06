const globalConfigs = require('@browserstack/tailwind-config');

const bifrostTailwindConfig = {
  ...globalConfigs.globalTailwindConfig
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

    'var(--colors-success-50)': '#f0fdf4',
    'var(--colors-success-100)': '#dcfce7',
    'var(--colors-success-200)': '#bbf7d0',
    'var(--colors-success-300)': '#86efac',
    'var(--colors-success-400)': '#4ade80',
    'var(--colors-success-500)': '#22c55e',
    'var(--colors-success-600)': '#16a34a',
    'var(--colors-success-700)': '#15803d',
    'var(--colors-success-800)': '#166534',
    'var(--colors-success-900)': '#14532d',

    'var(--colors-attention-50)': '#fefce8',
    'var(--colors-attention-100)': '#fef9c3',
    'var(--colors-attention-200)': '#fef08a',
    'var(--colors-attention-300)': '#fde047',
    'var(--colors-attention-400)': '#facc15',
    'var(--colors-attention-500)': '#eab308',
    'var(--colors-attention-600)': '#ca8a04',
    'var(--colors-attention-700)': '#a16207',
    'var(--colors-attention-800)': '#854d0e',
    'var(--colors-attention-900)': '#713f12',

    'var(--colors-information-50)': '#f0f9ff',
    'var(--colors-information-100)': '#e0f2fe',
    'var(--colors-information-200)': '#bae6fd',
    'var(--colors-information-300)': '#7dd3fc',
    'var(--colors-information-400)': '#38bdf8',
    'var(--colors-information-500)': '#0ea5e9',
    'var(--colors-information-600)': '#0284c7',
    'var(--colors-information-700)': '#0369a1',
    'var(--colors-information-800)': '#075985',
    'var(--colors-information-900)': '#0c4a6e'
  }
};

module.exports = bifrostTailwindConfig;
