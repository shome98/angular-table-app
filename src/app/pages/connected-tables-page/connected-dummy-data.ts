import { TableFormConfig } from '../../components/dynamic-table-form/dynamic-table-form.types';

export const CONNECTED_TABLE_CONFIGS: TableFormConfig[] = [
  // Table 1: Master Table (Source of Type and Amount)
  {
    id: 'master',
    title: '1. Master Budget Allocations (Source Table)',
    description: 'Master allocation records. Adding a row or editing "Type" or "Amount" immediately syncs down to the 4 operational tables below.',
    icon: 'fa-solid fa-vault',
    themeColor: 'primary',
    badge: { text: 'Master Source Table', colorClass: 'bg-primary' },
    addBtnText: 'Add Master Row (+ Syncs Next 4 Tables)',
    allowDelete: true,
    allowDuplicate: true,
    allowClear: true,
    showRowNumbers: true,
    emptyMessage: 'No master allocations exist. Click "Add Master Row" to add a record and generate rows across all 5 tables.',
    columns: [
      {
        key: 'title',
        label: 'Allocation Title',
        type: 'text',
        placeholder: 'e.g. NextGen Cloud Core',
        required: true,
        width: '200px'
      },
      {
        key: 'type',
        label: 'Allocation Type (Synced)',
        type: 'select',
        required: true,
        width: '210px',
        tooltip: 'Synced to next 4 tables',
        options: [
          { label: 'Cloud SaaS & Storage', value: 'Cloud SaaS & Storage' },
          { label: 'Hardware & Infrastructure', value: 'Hardware & Infrastructure' },
          { label: 'Consulting & Staffing', value: 'Consulting & Staffing' },
          { label: 'Security & Compliance', value: 'Security & Compliance' },
          { label: 'R&D Innovation Lab', value: 'R&D Innovation Lab' }
        ],
        defaultValue: 'Cloud SaaS & Storage'
      },
      {
        key: 'amount',
        label: 'Budget Amount ($) (Synced)',
        type: 'number',
        required: true,
        min: 500,
        step: 100,
        placeholder: '25000',
        width: '160px',
        tooltip: 'Synced to next 4 tables'
      },
      {
        key: 'fiscalQuarter',
        label: 'Fiscal Period',
        type: 'select',
        required: true,
        width: '130px',
        options: [
          { label: 'Q1 2026', value: 'Q1 2026' },
          { label: 'Q2 2026', value: 'Q2 2026' },
          { label: 'Q3 2026', value: 'Q3 2026' },
          { label: 'Q4 2026', value: 'Q4 2026' }
        ],
        defaultValue: 'Q1 2026'
      },
      {
        key: 'owner',
        label: 'Budget Owner',
        type: 'text',
        placeholder: 'Alex Rivera',
        required: true,
        width: '150px'
      },
      {
        key: 'isApproved',
        label: 'Approved',
        type: 'checkbox',
        defaultValue: true,
        width: '85px'
      }
    ]
  },

  // Table 2: Department Work Breakdown
  {
    id: 'department',
    title: '2. Department Work Breakdown (Connected Table)',
    description: 'Work stream assignments for each master allocation. Type & Amount are linked to Table 1.',
    icon: 'fa-solid fa-sitemap',
    themeColor: 'info',
    badge: { text: 'Connected to Table 1', colorClass: 'bg-info text-dark' },
    addBtnText: 'Add Department Entry',
    allowDelete: true,
    allowDuplicate: false,
    allowClear: false,
    showRowNumbers: true,
    emptyMessage: 'Awaiting rows from Table 1.',
    columns: [
      {
        key: 'type',
        label: 'Type',
        type: 'text',
        readOnly: true,
        badge: 'From Table 1',
        width: '180px',
        tooltip: 'Synced from Master Table 1'
      },
      {
        key: 'amount',
        label: 'Amount ($)',
        type: 'number',
        readOnly: true,
        badge: 'From Table 1',
        width: '130px',
        tooltip: 'Synced from Master Table 1'
      },
      {
        key: 'department',
        label: 'Assigned Department',
        type: 'select',
        required: true,
        width: '180px',
        options: [
          { label: 'Engineering Platform', value: 'Engineering Platform' },
          { label: 'Security Operations', value: 'Security Operations' },
          { label: 'Infrastructure & SRE', value: 'Infrastructure & SRE' },
          { label: 'Data & AI Team', value: 'Data & AI Team' },
          { label: 'Enterprise IT', value: 'Enterprise IT' }
        ],
        defaultValue: 'Engineering Platform'
      },
      {
        key: 'leadPerson',
        label: 'Tech Lead',
        type: 'text',
        placeholder: 'e.g. Elena Rostova',
        required: true,
        width: '160px'
      },
      {
        key: 'utilizationPercent',
        label: 'Utilization %',
        type: 'number',
        required: true,
        min: 0,
        max: 100,
        step: 5,
        placeholder: '80',
        width: '110px'
      },
      {
        key: 'headcount',
        label: 'Headcount',
        type: 'number',
        min: 1,
        max: 30,
        placeholder: '3',
        width: '100px'
      }
    ]
  },

  // Table 3: Vendor & Procurement Breakdown
  {
    id: 'vendor',
    title: '3. Vendor & Procurement Contracts (Connected Table)',
    description: 'Procurement details and commercial vendor terms mapped to each master allocation.',
    icon: 'fa-solid fa-file-contract',
    themeColor: 'success',
    badge: { text: 'Connected to Table 1', colorClass: 'bg-success' },
    addBtnText: 'Add Vendor Record',
    allowDelete: true,
    allowDuplicate: false,
    allowClear: false,
    showRowNumbers: true,
    emptyMessage: 'Awaiting rows from Table 1.',
    columns: [
      {
        key: 'type',
        label: 'Type',
        type: 'text',
        readOnly: true,
        badge: 'From Table 1',
        width: '180px',
        tooltip: 'Synced from Master Table 1'
      },
      {
        key: 'amount',
        label: 'Amount ($)',
        type: 'number',
        readOnly: true,
        badge: 'From Table 1',
        width: '130px',
        tooltip: 'Synced from Master Table 1'
      },
      {
        key: 'vendorName',
        label: 'Primary Vendor',
        type: 'text',
        placeholder: 'e.g. Amazon Web Services',
        required: true,
        width: '190px'
      },
      {
        key: 'contractRef',
        label: 'Contract / PO #',
        type: 'text',
        placeholder: 'PO-2026-881',
        required: true,
        width: '150px'
      },
      {
        key: 'paymentTerms',
        label: 'Payment Terms',
        type: 'select',
        required: true,
        width: '160px',
        options: [
          { label: 'Net 30', value: 'Net 30' },
          { label: 'Net 60', value: 'Net 60' },
          { label: 'Milestone 50/50', value: 'Milestone 50/50' },
          { label: 'Annual Upfront', value: 'Annual Upfront' }
        ],
        defaultValue: 'Net 30'
      },
      {
        key: 'taxIncluded',
        label: 'Tax Incl.',
        type: 'checkbox',
        defaultValue: true,
        width: '90px'
      }
    ]
  },

  // Table 4: Execution Schedule & Milestones
  {
    id: 'schedule',
    title: '4. Execution Schedule & Milestones (Connected Table)',
    description: 'Milestone planning and release scheduling tied to the master allocations.',
    icon: 'fa-solid fa-calendar-days',
    themeColor: 'warning',
    badge: { text: 'Connected to Table 1', colorClass: 'bg-warning text-dark' },
    addBtnText: 'Add Schedule Item',
    allowDelete: true,
    allowDuplicate: false,
    allowClear: false,
    showRowNumbers: true,
    emptyMessage: 'Awaiting rows from Table 1.',
    columns: [
      {
        key: 'type',
        label: 'Type',
        type: 'text',
        readOnly: true,
        badge: 'From Table 1',
        width: '180px',
        tooltip: 'Synced from Master Table 1'
      },
      {
        key: 'amount',
        label: 'Amount ($)',
        type: 'number',
        readOnly: true,
        badge: 'From Table 1',
        width: '130px',
        tooltip: 'Synced from Master Table 1'
      },
      {
        key: 'milestoneGoal',
        label: 'Deliverable Target',
        type: 'text',
        placeholder: 'e.g. Cluster Provisioning',
        required: true,
        width: '210px'
      },
      {
        key: 'deliveryQuarter',
        label: 'Delivery Quarter',
        type: 'select',
        required: true,
        width: '150px',
        options: [
          { label: 'Q1 2026', value: 'Q1 2026' },
          { label: 'Q2 2026', value: 'Q2 2026' },
          { label: 'Q3 2026', value: 'Q3 2026' },
          { label: 'Q4 2026', value: 'Q4 2026' }
        ],
        defaultValue: 'Q1 2026'
      },
      {
        key: 'targetDate',
        label: 'Target Go-Live',
        type: 'date',
        required: true,
        width: '150px'
      },
      {
        key: 'contingencyPercent',
        label: 'Buffer %',
        type: 'number',
        min: 0,
        max: 30,
        placeholder: '10',
        width: '95px'
      }
    ]
  },

  // Table 5: Audit, Risk & Compliance Controls
  {
    id: 'audit',
    title: '5. Audit, Risk & Compliance Controls (Connected Table)',
    description: 'Security oversight and regulatory governance for each master allocation item.',
    icon: 'fa-solid fa-shield-halved',
    themeColor: 'danger',
    badge: { text: 'Connected to Table 1', colorClass: 'bg-danger' },
    addBtnText: 'Add Audit Control',
    allowDelete: true,
    allowDuplicate: false,
    allowClear: false,
    showRowNumbers: true,
    emptyMessage: 'Awaiting rows from Table 1.',
    columns: [
      {
        key: 'type',
        label: 'Type',
        type: 'text',
        readOnly: true,
        badge: 'From Table 1',
        width: '180px',
        tooltip: 'Synced from Master Table 1'
      },
      {
        key: 'amount',
        label: 'Amount ($)',
        type: 'number',
        readOnly: true,
        badge: 'From Table 1',
        width: '130px',
        tooltip: 'Synced from Master Table 1'
      },
      {
        key: 'riskRating',
        label: 'Risk Rating',
        type: 'select',
        required: true,
        width: '150px',
        options: [
          { label: 'Low Risk', value: 'Low Risk' },
          { label: 'Medium Risk', value: 'Medium Risk' },
          { label: 'High Risk', value: 'High Risk' },
          { label: 'Critical Attention', value: 'Critical Attention' }
        ],
        defaultValue: 'Low Risk'
      },
      {
        key: 'complianceStandard',
        label: 'Framework',
        type: 'select',
        required: true,
        width: '170px',
        options: [
          { label: 'SOC 2 Type II', value: 'SOC 2 Type II' },
          { label: 'ISO 27001', value: 'ISO 27001' },
          { label: 'GDPR / Privacy', value: 'GDPR / Privacy' },
          { label: 'PCI-DSS v4.0', value: 'PCI-DSS v4.0' }
        ],
        defaultValue: 'SOC 2 Type II'
      },
      {
        key: 'auditorName',
        label: 'Compliance Officer',
        type: 'text',
        placeholder: 'e.g. Marcus Vance',
        required: true,
        width: '160px'
      },
      {
        key: 'auditSignOff',
        label: 'Signed Off',
        type: 'checkbox',
        defaultValue: false,
        width: '95px'
      }
    ]
  }
];

export const CONNECTED_DUMMY_DATA: Record<string, any[]> = {
  master: [
    {
      title: 'AWS Enterprise Cloud Modernization',
      type: 'Cloud SaaS & Storage',
      amount: 45000,
      fiscalQuarter: 'Q1 2026',
      owner: 'Alex Rivera',
      isApproved: true
    },
    {
      title: 'High-Performance GPU Cluster Nodes',
      type: 'Hardware & Infrastructure',
      amount: 28000,
      fiscalQuarter: 'Q2 2026',
      owner: 'Marcus Chen',
      isApproved: true
    },
    {
      title: 'Penetration Testing & SOC2 Recertification',
      type: 'Security & Compliance',
      amount: 19500,
      fiscalQuarter: 'Q2 2026',
      owner: 'Elena Rostova',
      isApproved: true
    }
  ],

  department: [
    {
      type: 'Cloud SaaS & Storage',
      amount: 45000,
      department: 'Infrastructure & SRE',
      leadPerson: 'Devon King',
      utilizationPercent: 90,
      headcount: 4
    },
    {
      type: 'Hardware & Infrastructure',
      amount: 28000,
      department: 'Data & AI Team',
      leadPerson: 'Marcus Chen',
      utilizationPercent: 85,
      headcount: 3
    },
    {
      type: 'Security & Compliance',
      amount: 19500,
      department: 'Security Operations',
      leadPerson: 'Elena Rostova',
      utilizationPercent: 95,
      headcount: 2
    }
  ],

  vendor: [
    {
      type: 'Cloud SaaS & Storage',
      amount: 45000,
      vendorName: 'Amazon Web Services',
      contractRef: 'PO-2026-AWS-1',
      paymentTerms: 'Annual Upfront',
      taxIncluded: true
    },
    {
      type: 'Hardware & Infrastructure',
      amount: 28000,
      vendorName: 'NVIDIA Enterprise Direct',
      contractRef: 'PO-2026-GPU-88',
      paymentTerms: 'Milestone 50/50',
      taxIncluded: true
    },
    {
      type: 'Security & Compliance',
      amount: 19500,
      vendorName: 'Bishop Fox Security Labs',
      contractRef: 'PO-2026-SOC-12',
      paymentTerms: 'Net 30',
      taxIncluded: true
    }
  ],

  schedule: [
    {
      type: 'Cloud SaaS & Storage',
      amount: 45000,
      milestoneGoal: 'VPC Peering & Database Migration',
      deliveryQuarter: 'Q1 2026',
      targetDate: '2026-03-31',
      contingencyPercent: 10
    },
    {
      type: 'Hardware & Infrastructure',
      amount: 28000,
      milestoneGoal: 'Rack Mounting & Benchmark Verification',
      deliveryQuarter: 'Q2 2026',
      targetDate: '2026-05-15',
      contingencyPercent: 15
    },
    {
      type: 'Security & Compliance',
      amount: 19500,
      milestoneGoal: 'Remediation Sprint & Final Report',
      deliveryQuarter: 'Q2 2026',
      targetDate: '2026-06-30',
      contingencyPercent: 5
    }
  ],

  audit: [
    {
      type: 'Cloud SaaS & Storage',
      amount: 45000,
      riskRating: 'Medium Risk',
      complianceStandard: 'ISO 27001',
      auditorName: 'Marcus Vance',
      auditSignOff: true
    },
    {
      type: 'Hardware & Infrastructure',
      amount: 28000,
      riskRating: 'Low Risk',
      complianceStandard: 'PCI-DSS v4.0',
      auditorName: 'Sophia Patel',
      auditSignOff: false
    },
    {
      type: 'Security & Compliance',
      amount: 19500,
      riskRating: 'High Risk',
      complianceStandard: 'SOC 2 Type II',
      auditorName: 'Claire Bennett',
      auditSignOff: true
    }
  ]
};
