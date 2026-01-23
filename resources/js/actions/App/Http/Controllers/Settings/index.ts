import ProfileController from './ProfileController'
import PasswordController from './PasswordController'
import TwoFactorAuthenticationController from './TwoFactorAuthenticationController'
import UserManagementController from './UserManagementController'
import RolePermissionController from './RolePermissionController'
import SystemSettingsController from './SystemSettingsController'
import LocationController from './LocationController'

const Settings = {
    ProfileController: Object.assign(ProfileController, ProfileController),
    PasswordController: Object.assign(PasswordController, PasswordController),
    TwoFactorAuthenticationController: Object.assign(TwoFactorAuthenticationController, TwoFactorAuthenticationController),
    UserManagementController: Object.assign(UserManagementController, UserManagementController),
    RolePermissionController: Object.assign(RolePermissionController, RolePermissionController),
    SystemSettingsController: Object.assign(SystemSettingsController, SystemSettingsController),
    LocationController: Object.assign(LocationController, LocationController),
}

export default Settings