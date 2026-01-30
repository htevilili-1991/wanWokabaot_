import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
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

const cashBoxes = {
    index: Object.assign(index, index),
}

export default cashBoxes