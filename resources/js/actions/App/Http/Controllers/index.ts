import Settings from './Settings'
import MemberController from './MemberController'
import InventoryController from './InventoryController'
import POSController from './POSController'
import PendingTransactionsController from './PendingTransactionsController'

const Controllers = {
    Settings: Object.assign(Settings, Settings),
    MemberController: Object.assign(MemberController, MemberController),
    InventoryController: Object.assign(InventoryController, InventoryController),
    POSController: Object.assign(POSController, POSController),
    PendingTransactionsController: Object.assign(PendingTransactionsController, PendingTransactionsController),
}

export default Controllers