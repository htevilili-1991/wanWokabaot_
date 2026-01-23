import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Settings\SystemSettingsController::index
* @see app/Http/Controllers/Settings/SystemSettingsController.php:17
* @route '/settings/system'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/settings/system',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Settings\SystemSettingsController::index
* @see app/Http/Controllers/Settings/SystemSettingsController.php:17
* @route '/settings/system'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Settings\SystemSettingsController::index
* @see app/Http/Controllers/Settings/SystemSettingsController.php:17
* @route '/settings/system'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Settings\SystemSettingsController::index
* @see app/Http/Controllers/Settings/SystemSettingsController.php:17
* @route '/settings/system'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Settings\SystemSettingsController::index
* @see app/Http/Controllers/Settings/SystemSettingsController.php:17
* @route '/settings/system'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Settings\SystemSettingsController::index
* @see app/Http/Controllers/Settings/SystemSettingsController.php:17
* @route '/settings/system'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Settings\SystemSettingsController::index
* @see app/Http/Controllers/Settings/SystemSettingsController.php:17
* @route '/settings/system'
*/
indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

index.form = indexForm

/**
* @see \App\Http\Controllers\Settings\SystemSettingsController::update
* @see app/Http/Controllers/Settings/SystemSettingsController.php:29
* @route '/settings/system'
*/
export const update = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/settings/system',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Settings\SystemSettingsController::update
* @see app/Http/Controllers/Settings/SystemSettingsController.php:29
* @route '/settings/system'
*/
update.url = (options?: RouteQueryOptions) => {
    return update.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Settings\SystemSettingsController::update
* @see app/Http/Controllers/Settings/SystemSettingsController.php:29
* @route '/settings/system'
*/
update.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Settings\SystemSettingsController::update
* @see app/Http/Controllers/Settings/SystemSettingsController.php:29
* @route '/settings/system'
*/
const updateForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Settings\SystemSettingsController::update
* @see app/Http/Controllers/Settings/SystemSettingsController.php:29
* @route '/settings/system'
*/
updateForm.put = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update.form = updateForm

const SystemSettingsController = { index, update }

export default SystemSettingsController