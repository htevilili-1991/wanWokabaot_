import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\PendingTransactionsController::index
* @see app/Http/Controllers/PendingTransactionsController.php:15
* @route '/pending-transactions'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/pending-transactions',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PendingTransactionsController::index
* @see app/Http/Controllers/PendingTransactionsController.php:15
* @route '/pending-transactions'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PendingTransactionsController::index
* @see app/Http/Controllers/PendingTransactionsController.php:15
* @route '/pending-transactions'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PendingTransactionsController::index
* @see app/Http/Controllers/PendingTransactionsController.php:15
* @route '/pending-transactions'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PendingTransactionsController::index
* @see app/Http/Controllers/PendingTransactionsController.php:15
* @route '/pending-transactions'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PendingTransactionsController::index
* @see app/Http/Controllers/PendingTransactionsController.php:15
* @route '/pending-transactions'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PendingTransactionsController::index
* @see app/Http/Controllers/PendingTransactionsController.php:15
* @route '/pending-transactions'
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
* @see \App\Http\Controllers\PendingTransactionsController::cancel
* @see app/Http/Controllers/PendingTransactionsController.php:86
* @route '/pending-sales/{pendingSale}/cancel'
*/
export const cancel = (args: { pendingSale: number | { id: number } } | [pendingSale: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: cancel.url(args, options),
    method: 'post',
})

cancel.definition = {
    methods: ["post"],
    url: '/pending-sales/{pendingSale}/cancel',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\PendingTransactionsController::cancel
* @see app/Http/Controllers/PendingTransactionsController.php:86
* @route '/pending-sales/{pendingSale}/cancel'
*/
cancel.url = (args: { pendingSale: number | { id: number } } | [pendingSale: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { pendingSale: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { pendingSale: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            pendingSale: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        pendingSale: typeof args.pendingSale === 'object'
        ? args.pendingSale.id
        : args.pendingSale,
    }

    return cancel.definition.url
            .replace('{pendingSale}', parsedArgs.pendingSale.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PendingTransactionsController::cancel
* @see app/Http/Controllers/PendingTransactionsController.php:86
* @route '/pending-sales/{pendingSale}/cancel'
*/
cancel.post = (args: { pendingSale: number | { id: number } } | [pendingSale: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: cancel.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PendingTransactionsController::cancel
* @see app/Http/Controllers/PendingTransactionsController.php:86
* @route '/pending-sales/{pendingSale}/cancel'
*/
const cancelForm = (args: { pendingSale: number | { id: number } } | [pendingSale: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: cancel.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PendingTransactionsController::cancel
* @see app/Http/Controllers/PendingTransactionsController.php:86
* @route '/pending-sales/{pendingSale}/cancel'
*/
cancelForm.post = (args: { pendingSale: number | { id: number } } | [pendingSale: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: cancel.url(args, options),
    method: 'post',
})

cancel.form = cancelForm

const PendingTransactionsController = { index, cancel }

export default PendingTransactionsController