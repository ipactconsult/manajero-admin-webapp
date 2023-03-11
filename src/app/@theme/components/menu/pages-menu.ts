import { NbMenuItem } from '@nebular/theme';
import moment from "moment";

let user: any;
let hrChildren: any = [];
let crmChildren: any = [];
let adminChildren: any = [];
let pmChildren: any = [];
let financeChildren: any = [];
let accountingChildren: any = [];
let commMarkChildren: any = [];
let recoveryLitigeChildren: any = [];
let pimChildren: any = [];
let dateToday = new Date();

if (sessionStorage.getItem('auth-user')) {
  user = JSON.parse(sessionStorage.getItem('auth-user'));
  if (user.role === 'ROLE_HR_MANAGER' || user.role === 'ROLE_ADMIN') {
    hrChildren = [
      {
        title:'Human Dashboard',
        link:'/hr/dashboard'
      },
      {
        title: 'Organigram',
        link: '/hr/organigram/view',
      },

      {
        title: 'Departments',
        link: '/hr/department/list',
        children: [
          {
            title: 'Add New',
            link: '/hr/department/create',
          },
          {
            title: 'All Departments',
            link: '/hr/department/list',
          },


        ]
      },

      {
        title: 'Employees',
        link: '/hr/employee/list_',
        children: [
          {
            title: 'Add New',
            link: '/hr/employee/create_',
          },
          {
            title: 'All Employees',
            link: '/hr/employee/list_',
          },

        ]
      },

      {
        title: 'Contracts',
        link: '/hr/contracts/keypad',
        children: [
          {
            title: 'All Contracts',
            link: '/hr/contracts/keypad',
          },
        ]
      },
      {
        title: 'Expenses',
        link: '/hr/expenses/keypad',
        children: [
          {
            title: 'All Expenses',
            link: '/hr/expenses/grid',
          },
        ]
      },

      {
        title: 'Payroll',
        link: '/pages/layout/infinite-list',
        children: [
          {
            title: 'Payroll Data',
            link: '/hr/pay/grid4payroll',
          },


        ]
      },
      {
        title: 'Absences',
        pathMatch: 'prefix',
        link: '/hr/absences/global_calendar',
        children: [
          {
            title: 'View Calendar',
            link: '/hr/absences/global_calendar',
          },

          {
            title: 'All Employees Requests',
            link: '/hr/absences/allLeavesRequestsGridView',
          },
          {
            title: 'All Employees Releases',
            link: '/hr/release/grid',
          },

        ]
      },
      {
        title: 'Recruitment',
        children : [
          {
            title: 'Recruitment Workflow',
            link: '/hr/recruitment/workflow',
          },
          {
            title: 'Job',
            link: '/hr/recruitment/jobs/addJob',
          },


          {
            title: 'Job Offers',
            link: '/hr/recruitment/jobs/grid',
          },
          {
            title: 'Skills',
            link: '/hr/skills/grid',
          },
          {
            title: 'Applications',
            link: '/hr/recruitment/applications/grid',
          },
          {
            title: 'Interviews',
            link: '/hr/recruitment/interview/room',
          },

        ]
      },

      {
        title: 'Evaluation',
        pathMatch: 'prefix',
        link: '/hr/evaluation/grid',
        children :  [
          {
            title: 'Add new',
            link: '/hr/evaluation/create',
          },
          {
            title: 'All Evaluations',
            link: '/hr/evaluation/grid',
          }
        ]
      },
      {
        title: 'Tranings',
        pathMatch: 'prefix',
        children :  [
          {
            title: 'Add new',
            link : '/hr/trainings/training/create'
          },
          {
            title: 'All Trainings',
            link : '/hr/trainings/grid'
          }
        ]
      },
      {
        title: 'History',
        pathMatch: 'prefix',
        children : [
          {
            title: 'Departments',
            link: '/hr/department/history',
          },
          {
            title: 'Employees',
            link: '/hr/employee/history',

          },
          {
            title: 'Contracts',
            link: '/hr/contracts/history',
          },
          {
            title: 'Absences',
            link: '/hr/absences/history',

          },

        ]
      },

    ];
  }
  if (user.role === 'ROLE_PROJECT_MANAGER' || user.role === 'ROLE_ADMIN') {
    pmChildren = [
      {
        title: 'Project Management Process',
        link: '/projectManagement/process',
      },
      {
        title: 'Project Charter',
        link: '/projectManagement/project-charter',
      },

      {
        title: 'Projects',
        link: '/projectManagement/projects',
      },
      {
        title: 'Shared Projects',
        link: '/projectManagement/sharedProject',
      },
      {
        title: 'Work space',
        link: '/projectManagement/tasks',
      },
    ]
  }
  if (user.role === 'ROLE_CRM_MANAGER' || user.role === 'ROLE_ADMIN') {
    crmChildren = [
      {
        title: 'Dashboard',
        link: '/crm/dashboard',
      },
      {
        title: 'Prospects',
        link: '/crm/prospects',
      },
      {
        title: 'Customers',
        link: '/crm/customers',
      },
      {
        title: 'Visits ',
        link: '/crm/visits',
      },
      {
        title: 'Quotations ',
        link: '/crm/quotations',
      },
      {
        title: 'Deals ',
        link: '/crm/deals',
      },

      {
        title: 'Contracts ',
        link: '/crm/contracts',
      },
      {
        title: 'Orders ',
        pathMatch: 'prefix',
        link: '/crm/orders',
      },
      {
        title: 'Claims ',
        pathMatch: 'prefix',
        link: '/crm/claims',
      },

      {
        title: 'Meet ',
        pathMatch: 'prefix',
        link: '/crm/meet',
      },
      {
        title:'Archive',
        children: [
          {
            title: 'Customers ',
            link: '/crm/history/customer-history',
          },
          {
            title: 'Prospects',
            link: '/crm/history/history-prospects',
          },
          {
            title: 'Visits',
            link: '/crm/history/visits-history',
          },
          {
            title: 'Deals',
            link: '/crm/history/deals-history',
          }, {
            title: 'Orders',
            link: '/crm/history/orders-history',
          },
          {
            title: 'Contracts',
            link: '/crm/history/contracts-history',
          },
          {
            title: 'Claims',
            link: '/crm/history/claims-history',
          },
        ]
      },
    ];
  }
  if (user.role === 'ROLE_CMKG_MANAGER' || user.role === 'ROLE_ADMIN') {
    commMarkChildren = [
      {
        title: 'Global Manazello Charter',
        link: '/communicationMarketing/GlobalCharter',
      },
      {
        title: 'Events',
        link: '/communicationMarketing/EventMarketing',
      },
      {
        title: 'Partenership',
        link: '/communicationMarketing/Parternership',
      },
      {
        title: 'Social Network ',
        link: '/communicationMarketing/SocialNetwork',
      },
      {
        title: 'Contact',
        pathMatch: 'prefix',
        link: '/communicationMarketing/Share',
      },
      {
        title: 'Marketing Management ',
        children: [
          {
            title: 'Publication',
            link: '/communicationMarketing/Publication',
          },
          {
            title: 'Persona',
            link: '/communicationMarketing/Persona',
          },
          {
            title: 'graphical charter',
            link: '/communicationMarketing/GraphicalCharter',
          },

          {
            title: 'Personas Materials',
            link: '/communicationMarketing/ProductPersonas',
          },

        ],
      },

      {
        title: 'Document Management System',
        link: '/communicationMarketing/comMarketing',
      },



      {
        title: 'Archive',
        children: [
          {
            title: 'Partner Archive',
            link: '/communicationMarketing/ArchivePartner',
          },


          {
            title: 'Event Archive',
            link: '/communicationMarketing/ArchiveEvent',
          },

          {
            title: 'Publicattion Archive',
            link: '/communicationMarketing/archivePublication',
          },
          {
            title: 'Global Charter Archive',
            link: '/communicationMarketing/ArchiveGlobalCharter',
          },
        ],
      },

      {
        title: 'Communication & Marketing Risk',

        link: '/communicationMarketing/personaStat',
      },
    ];
  }
  if (user.role === 'ROLE_FIN_MANAGER' || user.role === 'ROLE_ADMIN') {
    financeChildren = [
      {title:'Insights',
        link:'/finance/financeInsights'

      },

      {
        title: 'CashFlow Management',
        children: [
          {
            title :'Annual Cashflow Plan',
            link :'/finance/annualCashFlow'

          },
          {
            title :'Transactions History',
            link :'/finance/history'
          }
        ]
      },
      {title:'Income Statement',
        link:'/finance/incomeStatement'

      },
      {
        title: 'Business Documents',
        link: '/pages/layout/infinite-list',
        children : [
          {
            title:'Sales Process',
            link:'/pages/layout/infinite-list',
            children :[ { title :'Real Estate Process',
              link :'/finance/salesProcess'

            },{ title :'Products Process',
              link :'/finance/productsSalesProcess'

            }
            ]
          },

          { title :'Purchase Process',
            link :'/pages/layout/infinite-list',
            children : [
              { title :'Purchase Requests',
                link :'/finance/purchaseRequests'

              },
              { title :'Purchase Orders',
                link :'/finance/purchaseOrders'

              }
            ]



          }

        ]
      },
      {
        title: 'Budgets Management',
        link: '/pages/layout/accordion',
        children : [
          { title :'Annual Budget Plan',
            link :'/finance/annualBudget'
          },
          { title:'Monthly Budget Plan',
            link :'/finance/monthlyBudget/'+moment(dateToday).format("MMMM")+'/'+moment(dateToday).format("YYYY")

          },
          {
            title :'Forecast Budget Plan',
            link :'/finance/forecastBudget/'+moment(dateToday).format("YYYY")
          }

        ]
      },
      {
        title:'Reconciliation',
        link :'/finance/reconciliation'
      },
      {
        title: 'Finance Risk',
        pathMatch: 'prefix',
        link: '/pages/layout/tabs',
        children :[
          {
            title:'Enterprise Performance',
            link :'/finance/cfRisk'
          },

          {
            title:'Sales Tracking',
            link :'/finance/salesRisk'
          },

        ]
      }
    ];
  }
  if (user.role === 'ROLE_ACC_MANAGER' || user.role === 'ROLE_ADMIN') {
    accountingChildren = [
      {
        title: 'Insights',
        link: '/accounting/insights',
      },
      {
        title: 'Credits',
        children: [
          {
            title: 'Add New Credit',
            link: '/accounting/addcredit',
          },
          {
            title: 'Credit list',
            link: '/accounting/creditlist',
          },

        ]
      },
      {
        title: 'Journals',
        children: [
          {
            title: 'Journal list',
            link: '/accounting/journallist',
          },
          {
            title: 'Archived journals',
            link: '/accounting/archivedjournal',
          },
        ]
      },

      {
        title: 'Account list',
        link: '/accounting/accountlist',
      },
      {
        title: 'Invoices',
        children:[
          {
            title: 'Invoices list',
            link: '/accounting/invoicelist',
          },
          {
            title: 'Add invoice',
            link:'/accounting/addinvoice'
          }
        ]
      },
      {
        title: 'Statement',
        link: '/accounting/pdftronviwer',
      },

    ];
  }
  if (user.role === 'ROLE_PIM_MANAGER' || user.role === 'ROLE_ADMIN') {
    pimChildren = [
      {
        title: 'Dashboard',
        link: '/pim/dashboard'
      },
      {
        title: 'Materials',
        link: '/pim/procurement/materials'
      },
      {
        title: 'Suppliers',
        link: '/pim/suppliers'
      },
      {
        title: 'Categories',
        link: '/pim/categories'
      },
      {
        title: 'Reception',
        link: '/pim/received-materials'
      },
      {
        title: 'Purchase',
        children: [
          {
            title: 'All Purchases',
            link: '/pim/procurement/all-purchases'
          },
          {
            title: 'Purchase Requisitions',
            link: '/pim/procurement/purchase-requisitions'
          },
          {
            title: 'Request For Quotations',
            link: '/pim/procurement/rfqs'
          },
          {
            title: 'Quotations',
            link: '/pim/procurement/quotations'
          },
          {
            title: 'Purchase Orders',
            link: '/pim/procurement/purchase-orders'
          },
          {
            title: 'Purchase Returns',
            link: '/pim/purchase-returns'
          },
          {
            title: 'Receipts',
            link: '/pim/receipts'
          }
        ],
      },
      {
        title: 'Stock',
        children: [
          {
            title: 'Warehouses',
            link: '/pim/stock/warehouses',
          },
          {
            title: 'Inventories',
            link: '/pim/stock/inventories'
          },
          {
            title: 'Inventory Movements',
            link: '/pim/stock/inventory/movements'
          },
          {
            title: 'Stock Movements',
            link: '/pim/stock/movements',
          },
          {
            title: 'In Stock',
            link: '/pim/stock/in-stock',
          },
          {
            title: 'Replenishment',
            link: '/pim/replenishment'
          },
          {
            title: 'Stock Entries',
            link: '/pim/stock/entries',
          },
          {
            title: 'Stock Exits',
            link: '/pim/stock/out',
          },
        ],
      },
      {
        title: 'Archive',
        children: [
          {
            title: 'Materials',
            link: '/pim/archive/materials',
          },
          {
            title: 'Categories',
            link: '/pim/archive/categories',
          },
          {
            title: 'Suppliers',
            link: '/pim/archive/suppliers',
          },
          {
            title: 'Warehouses',
            link: '/pim/archive/warehouses',
          },
          {
            title: 'Puchase Requisitions',
            link: '/pim/archive/prs',
          },
          {
            title: 'Request For Quotations',
            link: '/pim/archive/rfqs',
          },
          {
            title: 'Quotations',
            link: '/pim/archive/quotations',
          },
          {
            title: 'Purchase Orders',
            link: '/pim/archive/purchase-orders',
          },
          {
            title: 'Purchase Returns',
            link: '/pim/archive/purchase-returns',
          },
          {
            title: 'Receipts',
            link: '/pim/archive/receipts',
          },
          {
            title: 'Stock Movements',
            link: '/pim/archive/stock-movements',
          },
          {
            title: 'Stock Entries',
            link: '/pim/archive/stock-entries',
          },
          {
            title: 'Stock Exits',
            link: '/pim/archive/stock-exits',
          },
          {
            title: 'Inventories',
            link: '/pim/archive/inventories',
          },
          {
            title: 'Inventory Movements',
            link: '/pim/archive/inventory-movements',
          },
        ],
      },
      {
        title: 'Documentation',
        link: '/pim/documentation'
      },
      {
        title: 'Meet',
        link: '/pim/meet'
      }
    ];
  }
  if (user.role === 'ROLE_RL_MANAGER' || user.role === 'ROLE_ADMIN') {
    recoveryLitigeChildren = [
      {
        title: 'Dashbord',
        link: '/litige/statistique',
      },
      {
        title: 'Documents',
        link: '/litige/listca',
      },
      {
        title: 'Disputes',
        link: '/litige/listlitige',
      },
      {
        title: 'Recovery',
        link: '/litige/relances',
      },
      {
        title: 'Lawyers',
        link: '/litige/listavocats',
        
      },
      {
        title: 'Laws',
        link: '/litige/listloi',
      },
    ];
  }
  if (user.role === 'ROLE_ADMIN') {
    adminChildren = [
      {
        title: 'Rental Request',
        link: '/administration/rentalRequest',
      },
      {
        title: 'Administration Dashboard',
        link: '/administration/dashboard',
      },
    ];
  }
}

export const MENU_ITEMS: NbMenuItem[] = [

  {
    title: 'Home',
    icon: 'home-outline',
    link: '/pages/dashboard',
  },
  {
    title: 'Channels',
    group: true,
  },
  {
    title: 'Administration',
    icon: 'settings-outline',
    children: adminChildren,
  },
  {
    title: 'Project Management',
    icon: 'list-outline',
    children: pmChildren,
  },
  {
    title: 'Human Capital Management',
    icon: 'people-outline',
    children: hrChildren,
  },
  {
    title: 'Finance',
    icon: 'activity-outline',
    children: financeChildren,
  },
  {
    title: 'Accounting',
    icon: 'briefcase-outline',
    children: accountingChildren,
  },
 
  {
    title: 'Product & Stock',
    icon: 'car-outline',
    children: pimChildren,
  },

  {
    title: 'Communication & Marketing',
    icon: 'share-outline',
    children: commMarkChildren,
  },
  {
    title: 'Recovery & Litige',
    icon: 'shield-off-outline',
    children: recoveryLitigeChildren,
  },
  {
    title: 'CRM',
    icon: 'people-outline',
    children: crmChildren,
  },
  {
    title: 'Chat',
    link: '/chat/messages',
    icon: 'navigation-2-outline',
  },
  {
    title: 'Configuration',
    group: true,
  },
  {
    title: 'Settings',
    icon: 'settings-outline',
  },
];
