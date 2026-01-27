import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
* @see \App\Http\Controllers\PendingTransactionsController::index
* @see app/Http/Controllers/PendingTransactionsController.php:17
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
* @see app/Http/Controllers/PendingTransactionsController.php:17
* @route '/pending-transactions'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PendingTransactionsController::index
* @see app/Http/Controllers/PendingTransactionsController.php:17
* @route '/pending-transactions'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PendingTransactionsController::index
* @see app/Http/Controllers/PendingTransactionsController.php:17
* @route '/pending-transactions'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PendingTransactionsController::index
* @see app/Http/Controllers/PendingTransactionsController.php:17
* @route '/pending-transactions'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PendingTransactionsController::index
* @see app/Http/Controllers/PendingTransactionsController.php:17
* @route '/pending-transactions'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PendingTransactionsController::index
* @see app/Http/Controllers/PendingTransactionsController.php:17
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

const pendingTransactions = {
    index: Object.assign(index, index),
}

export default pendingTransactions