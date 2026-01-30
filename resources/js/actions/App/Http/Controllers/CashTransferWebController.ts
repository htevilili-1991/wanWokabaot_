import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\CashTransferWebController::index
* @see app/Http/Controllers/CashTransferWebController.php:15
* @route '/cash-transfers'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/cash-transfers',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CashTransferWebController::index
* @see app/Http/Controllers/CashTransferWebController.php:15
* @route '/cash-transfers'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CashTransferWebController::index
* @see app/Http/Controllers/CashTransferWebController.php:15
* @route '/cash-transfers'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CashTransferWebController::index
* @see app/Http/Controllers/CashTransferWebController.php:15
* @route '/cash-transfers'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\CashTransferWebController::index
* @see app/Http/Controllers/CashTransferWebController.php:15
* @route '/cash-transfers'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CashTransferWebController::index
* @see app/Http/Controllers/CashTransferWebController.php:15
* @route '/cash-transfers'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CashTransferWebController::index
* @see app/Http/Controllers/CashTransferWebController.php:15
* @route '/cash-transfers'
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
* @see \App\Http\Controllers\CashTransferWebController::store
* @see app/Http/Controllers/CashTransferWebController.php:60
* @route '/cash-transfers'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/cash-transfers',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\CashTransferWebController::store
* @see app/Http/Controllers/CashTransferWebController.php:60
* @route '/cash-transfers'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CashTransferWebController::store
* @see app/Http/Controllers/CashTransferWebController.php:60
* @route '/cash-transfers'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CashTransferWebController::store
* @see app/Http/Controllers/CashTransferWebController.php:60
* @route '/cash-transfers'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CashTransferWebController::store
* @see app/Http/Controllers/CashTransferWebController.php:60
* @route '/cash-transfers'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\CashTransferWebController::complete
* @see app/Http/Controllers/CashTransferWebController.php:106
* @route '/cash-transfers/{cash_transfer}/complete'
*/
export const complete = (args: { cash_transfer: string | number } | [cash_transfer: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: complete.url(args, options),
    method: 'post',
})

complete.definition = {
    methods: ["post"],
    url: '/cash-transfers/{cash_transfer}/complete',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\CashTransferWebController::complete
* @see app/Http/Controllers/CashTransferWebController.php:106
* @route '/cash-transfers/{cash_transfer}/complete'
*/
complete.url = (args: { cash_transfer: string | number } | [cash_transfer: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { cash_transfer: args }
    }

    if (Array.isArray(args)) {
        args = {
            cash_transfer: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        cash_transfer: args.cash_transfer,
    }

    return complete.definition.url
            .replace('{cash_transfer}', parsedArgs.cash_transfer.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CashTransferWebController::complete
* @see app/Http/Controllers/CashTransferWebController.php:106
* @route '/cash-transfers/{cash_transfer}/complete'
*/
complete.post = (args: { cash_transfer: string | number } | [cash_transfer: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: complete.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CashTransferWebController::complete
* @see app/Http/Controllers/CashTransferWebController.php:106
* @route '/cash-transfers/{cash_transfer}/complete'
*/
const completeForm = (args: { cash_transfer: string | number } | [cash_transfer: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: complete.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CashTransferWebController::complete
* @see app/Http/Controllers/CashTransferWebController.php:106
* @route '/cash-transfers/{cash_transfer}/complete'
*/
completeForm.post = (args: { cash_transfer: string | number } | [cash_transfer: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: complete.url(args, options),
    method: 'post',
})

complete.form = completeForm

/**
* @see \App\Http\Controllers\CashTransferWebController::cancel
* @see app/Http/Controllers/CashTransferWebController.php:126
* @route '/cash-transfers/{cash_transfer}/cancel'
*/
export const cancel = (args: { cash_transfer: string | number } | [cash_transfer: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: cancel.url(args, options),
    method: 'post',
})

cancel.definition = {
    methods: ["post"],
    url: '/cash-transfers/{cash_transfer}/cancel',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\CashTransferWebController::cancel
* @see app/Http/Controllers/CashTransferWebController.php:126
* @route '/cash-transfers/{cash_transfer}/cancel'
*/
cancel.url = (args: { cash_transfer: string | number } | [cash_transfer: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { cash_transfer: args }
    }

    if (Array.isArray(args)) {
        args = {
            cash_transfer: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        cash_transfer: args.cash_transfer,
    }

    return cancel.definition.url
            .replace('{cash_transfer}', parsedArgs.cash_transfer.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CashTransferWebController::cancel
* @see app/Http/Controllers/CashTransferWebController.php:126
* @route '/cash-transfers/{cash_transfer}/cancel'
*/
cancel.post = (args: { cash_transfer: string | number } | [cash_transfer: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: cancel.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CashTransferWebController::cancel
* @see app/Http/Controllers/CashTransferWebController.php:126
* @route '/cash-transfers/{cash_transfer}/cancel'
*/
const cancelForm = (args: { cash_transfer: string | number } | [cash_transfer: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: cancel.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CashTransferWebController::cancel
* @see app/Http/Controllers/CashTransferWebController.php:126
* @route '/cash-transfers/{cash_transfer}/cancel'
*/
cancelForm.post = (args: { cash_transfer: string | number } | [cash_transfer: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: cancel.url(args, options),
    method: 'post',
})

cancel.form = cancelForm

/**
* @see \App\Http\Controllers\CashTransferWebController::destroy
* @see app/Http/Controllers/CashTransferWebController.php:144
* @route '/cash-transfers/{cash_transfer}'
*/
export const destroy = (args: { cash_transfer: string | number } | [cash_transfer: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/cash-transfers/{cash_transfer}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\CashTransferWebController::destroy
* @see app/Http/Controllers/CashTransferWebController.php:144
* @route '/cash-transfers/{cash_transfer}'
*/
destroy.url = (args: { cash_transfer: string | number } | [cash_transfer: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { cash_transfer: args }
    }

    if (Array.isArray(args)) {
        args = {
            cash_transfer: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        cash_transfer: args.cash_transfer,
    }

    return destroy.definition.url
            .replace('{cash_transfer}', parsedArgs.cash_transfer.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CashTransferWebController::destroy
* @see app/Http/Controllers/CashTransferWebController.php:144
* @route '/cash-transfers/{cash_transfer}'
*/
destroy.delete = (args: { cash_transfer: string | number } | [cash_transfer: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\CashTransferWebController::destroy
* @see app/Http/Controllers/CashTransferWebController.php:144
* @route '/cash-transfers/{cash_transfer}'
*/
const destroyForm = (args: { cash_transfer: string | number } | [cash_transfer: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CashTransferWebController::destroy
* @see app/Http/Controllers/CashTransferWebController.php:144
* @route '/cash-transfers/{cash_transfer}'
*/
destroyForm.delete = (args: { cash_transfer: string | number } | [cash_transfer: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const CashTransferWebController = { index, store, complete, cancel, destroy }

export default CashTransferWebController