import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
* @see \App\Http\Controllers\PendingTransactionsController::index
* @see app/Http/Controllers/PendingTransactionsController.php:177
* @route '/completed-transactions'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/completed-transactions',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PendingTransactionsController::index
* @see app/Http/Controllers/PendingTransactionsController.php:177
* @route '/completed-transactions'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PendingTransactionsController::index
* @see app/Http/Controllers/PendingTransactionsController.php:177
* @route '/completed-transactions'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PendingTransactionsController::index
* @see app/Http/Controllers/PendingTransactionsController.php:177
* @route '/completed-transactions'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PendingTransactionsController::index
* @see app/Http/Controllers/PendingTransactionsController.php:177
* @route '/completed-transactions'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PendingTransactionsController::index
* @see app/Http/Controllers/PendingTransactionsController.php:177
* @route '/completed-transactions'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PendingTransactionsController::index
* @see app/Http/Controllers/PendingTransactionsController.php:177
* @route '/completed-transactions'
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

const completedTransactions = {
    index: Object.assign(index, index),
}

export default completedTransactions