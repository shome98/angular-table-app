import { TableFormConfig } from '../components/dynamic-table-form/dynamic-table-form.types';

export const TABLE_FORM_CONFIGS: TableFormConfig[] = [
  // Table 1: Employee Directory
  {
    id: 'employees',
    title: 'Team Members & Directory',
    description: 'Manage staff profiles, departmental allocations, and engagement status.',
    icon: 'fa-solid fa-users',
    themeColor: 'primary',
    badge: { text: 'HR & People Ops', colorClass: 'bg-primary' },
    addBtnText: 'Add New Member',
    allowDelete: true,
    allowDuplicate: true,
    allowClear: true,
    showRowNumbers: true,
    emptyMessage: 'No team members added yet. Click "Add New Member" to begin.',
    columns: [
      {
        key: 'name',
        label: 'Full Name',
        type: 'text',
        placeholder: 'e.g. Sarah Jenkins',
        required: true,
        minLength: 2,
        maxLength: 50,
        width: '180px'
      },
      {
        key: 'email',
        label: 'Work Email',
        type: 'email',
        placeholder: 'sarah@company.com',
        required: true,
        width: '210px'
      },
      {
        key: 'department',
        label: 'Department',
        type: 'select',
        required: true,
        width: '160px',
        options: [
          { label: 'Engineering', value: 'Engineering' },
          { label: 'Product & Design', value: 'Product & Design' },
          { label: 'Marketing', value: 'Marketing' },
          { label: 'Customer Success', value: 'Customer Success' },
          { label: 'Human Resources', value: 'Human Resources' }
        ],
        defaultValue: 'Engineering'
      },
      {
        key: 'role',
        label: 'Role / Designation',
        type: 'text',
        placeholder: 'e.g. Lead Architect',
        required: true,
        width: '170px'
      },
      {
        key: 'joinDate',
        label: 'Join Date',
        type: 'date',
        required: true,
        width: '150px'
      },
      {
        key: 'performanceScore',
        label: 'Rating (1-5)',
        type: 'number',
        required: false,
        min: 1,
        max: 5,
        step: 0.1,
        placeholder: '4.5',
        width: '110px'
      },
      {
        key: 'isActive',
        label: 'Active',
        type: 'checkbox',
        defaultValue: true,
        width: '80px',
        tooltip: 'Whether member has active workspace access'
      }
    ]
  },

  // Table 2: Product Inventory
  {
    id: 'inventory',
    title: 'Product Stock & Inventory',
    description: 'Track store merchandise, stock thresholds, pricing, and replenishment statuses.',
    icon: 'fa-solid fa-boxes-stacked',
    themeColor: 'success',
    badge: { text: 'Logistics & Supply', colorClass: 'bg-success' },
    addBtnText: 'Add Product Item',
    allowDelete: true,
    allowDuplicate: true,
    allowClear: true,
    showRowNumbers: true,
    emptyMessage: 'Warehouse inventory is empty. Add a product to get started.',
    columns: [
      {
        key: 'sku',
        label: 'SKU Code',
        type: 'text',
        placeholder: 'SKU-0012',
        required: true,
        pattern: '^[A-Z0-9-]+$',
        patternMessage: 'Uppercase letters, numbers & hyphens only',
        width: '140px'
      },
      {
        key: 'name',
        label: 'Product Name',
        type: 'text',
        placeholder: 'Wireless Ergonomic Keyboard',
        required: true,
        width: '200px'
      },
      {
        key: 'category',
        label: 'Category',
        type: 'select',
        required: true,
        width: '160px',
        options: [
          { label: 'Hardware & Peripherals', value: 'Hardware & Peripherals' },
          { label: 'Office Supplies', value: 'Office Supplies' },
          { label: 'Networking Gear', value: 'Networking Gear' },
          { label: 'Storage Devices', value: 'Storage Devices' },
          { label: 'Audio / Video', value: 'Audio / Video' }
        ],
        defaultValue: 'Hardware & Peripherals'
      },
      {
        key: 'stockQty',
        label: 'In Stock',
        type: 'number',
        placeholder: '50',
        required: true,
        min: 0,
        width: '110px'
      },
      {
        key: 'unitPrice',
        label: 'Unit Price ($)',
        type: 'number',
        placeholder: '89.99',
        required: true,
        min: 0.01,
        step: 0.01,
        width: '120px'
      },
      {
        key: 'warehouseLocation',
        label: 'Aisle / Bin',
        type: 'text',
        placeholder: 'A2-B4',
        required: false,
        width: '120px'
      },
      {
        key: 'available',
        label: 'Available',
        type: 'checkbox',
        defaultValue: true,
        width: '90px'
      }
    ]
  },

  // Table 3: Sprint Tasks
  {
    id: 'tasks',
    title: 'Sprint Backlog & Tasks',
    description: 'Sprint planning board items, priorities, estimates, and assignees.',
    icon: 'fa-solid fa-list-check',
    themeColor: 'info',
    badge: { text: 'Agile Dev Sprint', colorClass: 'bg-info text-dark' },
    addBtnText: 'Add New Task',
    allowDelete: true,
    allowDuplicate: true,
    allowClear: true,
    showRowNumbers: true,
    emptyMessage: 'No backlog tasks created for this sprint yet.',
    columns: [
      {
        key: 'title',
        label: 'Task Summary',
        type: 'text',
        placeholder: 'Implement JWT refresh tokens',
        required: true,
        minLength: 5,
        width: '240px'
      },
      {
        key: 'priority',
        label: 'Priority',
        type: 'select',
        required: true,
        width: '130px',
        options: [
          { label: 'Critical', value: 'Critical' },
          { label: 'High', value: 'High' },
          { label: 'Medium', value: 'Medium' },
          { label: 'Low', value: 'Low' }
        ],
        defaultValue: 'Medium'
      },
      {
        key: 'status',
        label: 'Status',
        type: 'select',
        required: true,
        width: '140px',
        options: [
          { label: 'To Do', value: 'To Do' },
          { label: 'In Progress', value: 'In Progress' },
          { label: 'Code Review', value: 'Code Review' },
          { label: 'Completed', value: 'Completed' }
        ],
        defaultValue: 'To Do'
      },
      {
        key: 'assignee',
        label: 'Assignee',
        type: 'text',
        placeholder: 'Alex Rivera',
        required: true,
        width: '150px'
      },
      {
        key: 'estimatedHours',
        label: 'Est. Hours',
        type: 'number',
        placeholder: '8',
        required: true,
        min: 1,
        max: 80,
        width: '110px'
      },
      {
        key: 'dueDate',
        label: 'Due Date',
        type: 'date',
        required: true,
        width: '150px'
      },
      {
        key: 'isBlocked',
        label: 'Blocked',
        type: 'checkbox',
        defaultValue: false,
        width: '80px',
        tooltip: 'Check if this item is blocked by an external dependency'
      }
    ]
  },

  // Table 4: Vendor & Supplier Contracts
  {
    id: 'vendors',
    title: 'Vendors & Supplier Contracts',
    description: 'Maintain vendor SLA agreements, contract renewals, and annual values.',
    icon: 'fa-solid fa-handshake',
    themeColor: 'warning',
    badge: { text: 'Procurement', colorClass: 'bg-warning text-dark' },
    addBtnText: 'Add Vendor Contract',
    allowDelete: true,
    allowDuplicate: true,
    allowClear: true,
    showRowNumbers: true,
    emptyMessage: 'No contracts registered. Add a vendor contract to view details.',
    columns: [
      {
        key: 'vendorName',
        label: 'Vendor Company',
        type: 'text',
        placeholder: 'CloudScale Global Inc.',
        required: true,
        width: '190px'
      },
      {
        key: 'contactPerson',
        label: 'Primary Contact',
        type: 'text',
        placeholder: 'David Miller',
        required: true,
        width: '160px'
      },
      {
        key: 'serviceType',
        label: 'Service Category',
        type: 'select',
        required: true,
        width: '170px',
        options: [
          { label: 'Cloud Infrastructure', value: 'Cloud Infrastructure' },
          { label: 'Cybersecurity', value: 'Cybersecurity' },
          { label: 'SaaS Tooling', value: 'SaaS Tooling' },
          { label: 'Hardware Maintenance', value: 'Hardware Maintenance' },
          { label: 'Consulting Services', value: 'Consulting Services' }
        ],
        defaultValue: 'Cloud Infrastructure'
      },
      {
        key: 'annualValue',
        label: 'Annual Cost ($)',
        type: 'number',
        placeholder: '12500',
        required: true,
        min: 100,
        width: '130px'
      },
      {
        key: 'renewalDate',
        label: 'Renewal Date',
        type: 'date',
        required: true,
        width: '150px'
      },
      {
        key: 'slaTier',
        label: 'SLA Tier',
        type: 'select',
        required: true,
        width: '120px',
        options: [
          { label: 'Platinum 24/7', value: 'Platinum' },
          { label: 'Gold 99.9%', value: 'Gold' },
          { label: 'Silver Standard', value: 'Silver' }
        ],
        defaultValue: 'Gold'
      },
      {
        key: 'autoRenew',
        label: 'Auto-Renew',
        type: 'checkbox',
        defaultValue: true,
        width: '100px'
      }
    ]
  },

  // Table 5: Expense Tracker & Claims
  {
    id: 'expenses',
    title: 'Department Expense Claims',
    description: 'Employee reimbursements, travel expenses, client bills, and operational outlays.',
    icon: 'fa-solid fa-receipt',
    themeColor: 'danger',
    badge: { text: 'Finance & Accounts', colorClass: 'bg-danger' },
    addBtnText: 'Add Expense Item',
    allowDelete: true,
    allowDuplicate: true,
    allowClear: true,
    showRowNumbers: true,
    emptyMessage: 'No recorded expenses in this claim statement.',
    columns: [
      {
        key: 'description',
        label: 'Expense Description',
        type: 'text',
        placeholder: 'AWS Cloud Hosting - Nov',
        required: true,
        width: '210px'
      },
      {
        key: 'category',
        label: 'Category',
        type: 'select',
        required: true,
        width: '150px',
        options: [
          { label: 'Software & Tools', value: 'Software & Tools' },
          { label: 'Travel & Lodging', value: 'Travel & Lodging' },
          { label: 'Client Meals', value: 'Client Meals' },
          { label: 'Equipment & Hardware', value: 'Equipment & Hardware' },
          { label: 'Training & Books', value: 'Training & Books' }
        ],
        defaultValue: 'Software & Tools'
      },
      {
        key: 'amount',
        label: 'Amount',
        type: 'number',
        placeholder: '240.50',
        required: true,
        min: 0.01,
        step: 0.01,
        width: '120px'
      },
      {
        key: 'currency',
        label: 'Currency',
        type: 'select',
        required: true,
        width: '110px',
        options: [
          { label: 'USD ($)', value: 'USD' },
          { label: 'EUR (€)', value: 'EUR' },
          { label: 'GBP (£)', value: 'GBP' },
          { label: 'INR (₹)', value: 'INR' },
          { label: 'CAD ($)', value: 'CAD' }
        ],
        defaultValue: 'USD'
      },
      {
        key: 'date',
        label: 'Expense Date',
        type: 'date',
        required: true,
        width: '150px'
      },
      {
        key: 'receiptReference',
        label: 'Receipt / Ref #',
        type: 'text',
        placeholder: 'REC-90812',
        required: false,
        width: '140px'
      },
      {
        key: 'isBillable',
        label: 'Billable',
        type: 'checkbox',
        defaultValue: false,
        width: '85px',
        tooltip: 'Check if this expense is charged to a client project'
      }
    ]
  }
];

export const TABLE_DUMMY_DATA: Record<string, any[]> = {
  employees: [
    {
      name: 'Elena Rostova',
      email: 'elena.rostova@acme.io',
      department: 'Engineering',
      role: 'Staff Frontend Engineer',
      joinDate: '2022-03-15',
      performanceScore: 4.8,
      isActive: true
    },
    {
      name: 'Marcus Chen',
      email: 'marcus.chen@acme.io',
      department: 'Product & Design',
      role: 'Senior UI/UX Designer',
      joinDate: '2023-01-10',
      performanceScore: 4.6,
      isActive: true
    },
    {
      name: 'Sophia Patel',
      email: 'sophia.patel@acme.io',
      department: 'Customer Success',
      role: 'Enterprise Onboarding Lead',
      joinDate: '2021-08-01',
      performanceScore: 4.9,
      isActive: true
    }
  ],

  inventory: [
    {
      sku: 'SKU-LOGI-88',
      name: 'Logitech MX Master 3S',
      category: 'Hardware & Peripherals',
      stockQty: 84,
      unitPrice: 99.99,
      warehouseLocation: 'Bin-C12',
      available: true
    },
    {
      sku: 'SKU-DELL-4K',
      name: 'Dell UltraSharp 27" 4K Monitor',
      category: 'Hardware & Peripherals',
      stockQty: 32,
      unitPrice: 429.50,
      warehouseLocation: 'Bin-A04',
      available: true
    },
    {
      sku: 'SKU-USBC-HUB',
      name: 'Anker 10-in-1 USB-C Docking Hub',
      category: 'Hardware & Peripherals',
      stockQty: 110,
      unitPrice: 79.99,
      warehouseLocation: 'Bin-D02',
      available: true
    }
  ],

  tasks: [
    {
      title: 'Design reusable table form architecture',
      priority: 'Critical',
      status: 'Completed',
      assignee: 'Elena Rostova',
      estimatedHours: 12,
      dueDate: '2026-11-25',
      isBlocked: false
    },
    {
      title: 'Configure Bootstrap & FontAwesome CDN integrations',
      priority: 'High',
      status: 'Completed',
      assignee: 'Marcus Chen',
      estimatedHours: 4,
      dueDate: '2026-11-26',
      isBlocked: false
    },
    {
      title: 'Add live reactive form validation & JSON preview modal',
      priority: 'Medium',
      status: 'In Progress',
      assignee: 'Sophia Patel',
      estimatedHours: 8,
      dueDate: '2026-11-28',
      isBlocked: false
    }
  ],

  vendors: [
    {
      vendorName: 'Amazon Web Services',
      contactPerson: 'David Ross',
      serviceType: 'Cloud Infrastructure',
      annualValue: 48000,
      renewalDate: '2027-02-01',
      slaTier: 'Platinum',
      autoRenew: true
    },
    {
      vendorName: 'Datadog APM',
      contactPerson: 'Claire Bennett',
      serviceType: 'SaaS Tooling',
      annualValue: 14200,
      renewalDate: '2026-12-15',
      slaTier: 'Gold',
      autoRenew: true
    },
    {
      vendorName: 'CrowdStrike Falcon',
      contactPerson: 'Victor Vance',
      serviceType: 'Cybersecurity',
      annualValue: 22500,
      renewalDate: '2027-05-30',
      slaTier: 'Gold',
      autoRenew: false
    }
  ],

  expenses: [
    {
      description: 'Annual JetBrains Enterprise IDE Suite',
      category: 'Software & Tools',
      amount: 1499.00,
      currency: 'USD',
      date: '2026-11-01',
      receiptReference: 'JB-882910',
      isBillable: false
    },
    {
      description: 'Client Discovery Dinner with Fintech Partner',
      category: 'Client Meals',
      amount: 342.80,
      currency: 'USD',
      date: '2026-11-14',
      receiptReference: 'REC-MEAL-44',
      isBillable: true
    },
    {
      description: 'Roundtrip Flight for Tech Summit Keynote',
      category: 'Travel & Lodging',
      amount: 720.00,
      currency: 'USD',
      date: '2026-11-18',
      receiptReference: 'AIR-99201',
      isBillable: true
    }
  ]
};
