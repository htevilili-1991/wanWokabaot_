import DashboardController from './DashboardController'
import MemberController from './MemberController'
import InventoryController from './InventoryController'
import PendingTransactionsController from './PendingTransactionsController'
import Settings from './Settings'
import CategoryController from './CategoryController'
import CashBoxWebController from './CashBoxWebController'
import CashTransferWebController from './CashTransferWebController'
import POSController from './POSController'
import DividendController from './DividendController'
import ReportsController from './ReportsController'

const Controllers = {
    DashboardController: Object.assign(DashboardController, DashboardController),
    MemberController: Object.assign(MemberController, MemberController),
    InventoryController: Object.assign(InventoryController, InventoryController),
    PendingTransactionsController: Object.assign(PendingTransactionsController, PendingTransactionsController),
    Settings: Object.assign(Settings, Settings),
    CategoryController: Object.assign(CategoryController, CategoryController),
    CashBoxWebController: Object.assign(CashBoxWebController, CashBoxWebController),
    CashTransferWebController: Object.assign(CashTransferWebController, CashTransferWebController),
    POSController: Object.assign(POSController, POSController),
    DividendController: Object.assign(DividendController, DividendController),
    ReportsController: Object.assign(ReportsController, ReportsController),
}

export default Controllers