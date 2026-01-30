import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\CashBoxWebController::index
* @see app/Http/Controllers/CashBoxWebController.php:15
* @route '/cash-boxes'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/cash-boxes',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CashBoxWebController::index
* @see app/Http/Controllers/CashBoxWebController.php:15
* @route '/cash-boxes'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CashBoxWebController::index
* @see app/Http/Controllers/CashBoxWebController.php:15
* @route '/cash-boxes'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CashBoxWebController::index
* @see app/Http/Controllers/CashBoxWebController.php:15
* @route '/cash-boxes'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\CashBoxWebController::index
* @see app/Http/Controllers/CashBoxWebController.php:15
* @route '/cash-boxes'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CashBoxWebController::index
* @see app/Http/Controllers/CashBoxWebController.php:15
* @route '/cash-boxes'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CashBoxWebController::index
* @see app/Http/Controllers/CashBoxWebController.php:15
* @route '/cash-boxes'
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
* @see \App\Http\Controllers\CashBoxWebController::store
* @see app/Http/Controllers/CashBoxWebController.php:30
* @route '/cash-boxes'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/cash-boxes',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\CashBoxWebController::store
* @see app/Http/Controllers/CashBoxWebController.php:30
* @route '/cash-boxes'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CashBoxWebController::store
* @see app/Http/Controllers/CashBoxWebController.php:30
* @route '/cash-boxes'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CashBoxWebController::store
* @see app/Http/Controllers/CashBoxWebController.php:30
* @route '/cash-boxes'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CashBoxWebController::store
* @see app/Http/Controllers/CashBoxWebController.php:30
* @route '/cash-boxes'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\CashBoxWebController::update
* @see app/Http/Controllers/CashBoxWebController.php:55
* @route '/cash-boxes/{cash_box}'
*/
export const update = (args: { cash_box: string | number } | [cash_box: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/cash-boxes/{cash_box}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\CashBoxWebController::update
* @see app/Http/Controllers/CashBoxWebController.php:55
* @route '/cash-boxes/{cash_box}'
*/
update.url = (args: { cash_box: string | number } | [cash_box: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { cash_box: args }
    }

    if (Array.isArray(args)) {
        args = {
            cash_box: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        cash_box: args.cash_box,
    }

    return update.definition.url
            .replace('{cash_box}', parsedArgs.cash_box.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CashBoxWebController::update
* @see app/Http/Controllers/CashBoxWebController.php:55
* @route '/cash-boxes/{cash_box}'
*/
update.put = (args: { cash_box: string | number } | [cash_box: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\CashBoxWebController::update
* @see app/Http/Controllers/CashBoxWebController.php:55
* @route '/cash-boxes/{cash_box}'
*/
const updateForm = (args: { cash_box: string | number } | [cash_box: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CashBoxWebController::update
* @see app/Http/Controllers/CashBoxWebController.php:55
* @route '/cash-boxes/{cash_box}'
*/
updateForm.put = (args: { cash_box: string | number } | [cash_box: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update.form = updateForm

/**
* @see \App\Http\Controllers\CashBoxWebController::destroy
* @see app/Http/Controllers/CashBoxWebController.php:79
* @route '/cash-boxes/{cash_box}'
*/
export const destroy = (args: { cash_box: string | number } | [cash_box: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/cash-boxes/{cash_box}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\CashBoxWebController::destroy
* @see app/Http/Controllers/CashBoxWebController.php:79
* @route '/cash-boxes/{cash_box}'
*/
destroy.url = (args: { cash_box: string | number } | [cash_box: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { cash_box: args }
    }

    if (Array.isArray(args)) {
        args = {
            cash_box: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        cash_box: args.cash_box,
    }

    return destroy.definition.url
            .replace('{cash_box}', parsedArgs.cash_box.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CashBoxWebController::destroy
* @see app/Http/Controllers/CashBoxWebController.php:79
* @route '/cash-boxes/{cash_box}'
*/
destroy.delete = (args: { cash_box: string | number } | [cash_box: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\CashBoxWebController::destroy
* @see app/Http/Controllers/CashBoxWebController.php:79
* @route '/cash-boxes/{cash_box}'
*/
const destroyForm = (args: { cash_box: string | number } | [cash_box: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CashBoxWebController::destroy
* @see app/Http/Controllers/CashBoxWebController.php:79
* @route '/cash-boxes/{cash_box}'
*/
destroyForm.delete = (args: { cash_box: string | number } | [cash_box: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

/**
* @see \App\Http\Controllers\CashBoxWebController::adjustBalance
* @see app/Http/Controllers/CashBoxWebController.php:99
* @route '/cash-boxes/{cash_box}/adjust-balance'
*/
export const adjustBalance = (args: { cash_box: string | number } | [cash_box: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: adjustBalance.url(args, options),
    method: 'post',
})

adjustBalance.definition = {
    methods: ["post"],
    url: '/cash-boxes/{cash_box}/adjust-balance',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\CashBoxWebController::adjustBalance
* @see app/Http/Controllers/CashBoxWebController.php:99
* @route '/cash-boxes/{cash_box}/adjust-balance'
*/
adjustBalance.url = (args: { cash_box: string | number } | [cash_box: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { cash_box: args }
    }

    if (Array.isArray(args)) {
        args = {
            cash_box: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        cash_box: args.cash_box,
    }

    return adjustBalance.definition.url
            .replace('{cash_box}', parsedArgs.cash_box.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CashBoxWebController::adjustBalance
* @see app/Http/Controllers/CashBoxWebController.php:99
* @route '/cash-boxes/{cash_box}/adjust-balance'
*/
adjustBalance.post = (args: { cash_box: string | number } | [cash_box: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: adjustBalance.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CashBoxWebController::adjustBalance
* @see app/Http/Controllers/CashBoxWebController.php:99
* @route '/cash-boxes/{cash_box}/adjust-balance'
*/
const adjustBalanceForm = (args: { cash_box: string | number } | [cash_box: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: adjustBalance.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CashBoxWebController::adjustBalance
* @see app/Http/Controllers/CashBoxWebController.php:99
* @route '/cash-boxes/{cash_box}/adjust-balance'
*/
adjustBalanceForm.post = (args: { cash_box: string | number } | [cash_box: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: adjustBalance.url(args, options),
    method: 'post',
})

adjustBalance.form = adjustBalanceForm

const CashBoxWebController = { index, store, update, destroy, adjustBalance }

export default CashBoxWebController