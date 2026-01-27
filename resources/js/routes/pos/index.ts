import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
* @see \App\Http\Controllers\POSController::index
* @see app/Http/Controllers/POSController.php:20
* @route '/pos'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/pos',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\POSController::index
* @see app/Http/Controllers/POSController.php:20
* @route '/pos'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\POSController::index
* @see app/Http/Controllers/POSController.php:20
* @route '/pos'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\POSController::index
* @see app/Http/Controllers/POSController.php:20
* @route '/pos'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\POSController::index
* @see app/Http/Controllers/POSController.php:20
* @route '/pos'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\POSController::index
* @see app/Http/Controllers/POSController.php:20
* @route '/pos'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\POSController::index
* @see app/Http/Controllers/POSController.php:20
* @route '/pos'
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
* @see \App\Http\Controllers\POSController::products
* @see app/Http/Controllers/POSController.php:49
* @route '/pos/products'
*/
export const products = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: products.url(options),
    method: 'get',
})

products.definition = {
    methods: ["get","head"],
    url: '/pos/products',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\POSController::products
* @see app/Http/Controllers/POSController.php:49
* @route '/pos/products'
*/
products.url = (options?: RouteQueryOptions) => {
    return products.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\POSController::products
* @see app/Http/Controllers/POSController.php:49
* @route '/pos/products'
*/
products.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: products.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\POSController::products
* @see app/Http/Controllers/POSController.php:49
* @route '/pos/products'
*/
products.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: products.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\POSController::products
* @see app/Http/Controllers/POSController.php:49
* @route '/pos/products'
*/
const productsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: products.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\POSController::products
* @see app/Http/Controllers/POSController.php:49
* @route '/pos/products'
*/
productsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: products.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\POSController::products
* @see app/Http/Controllers/POSController.php:49
* @route '/pos/products'
*/
productsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: products.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

products.form = productsForm

/**
* @see \App\Http\Controllers\POSController::sale
* @see app/Http/Controllers/POSController.php:69
* @route '/pos/sale'
*/
export const sale = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: sale.url(options),
    method: 'post',
})

sale.definition = {
    methods: ["post"],
    url: '/pos/sale',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\POSController::sale
* @see app/Http/Controllers/POSController.php:69
* @route '/pos/sale'
*/
sale.url = (options?: RouteQueryOptions) => {
    return sale.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\POSController::sale
* @see app/Http/Controllers/POSController.php:69
* @route '/pos/sale'
*/
sale.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: sale.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\POSController::sale
* @see app/Http/Controllers/POSController.php:69
* @route '/pos/sale'
*/
const saleForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: sale.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\POSController::sale
* @see app/Http/Controllers/POSController.php:69
* @route '/pos/sale'
*/
saleForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: sale.url(options),
    method: 'post',
})

sale.form = saleForm

/**
* @see \App\Http\Controllers\POSController::savePending
* @see app/Http/Controllers/POSController.php:114
* @route '/pos/save-pending'
*/
export const savePending = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: savePending.url(options),
    method: 'post',
})

savePending.definition = {
    methods: ["post"],
    url: '/pos/save-pending',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\POSController::savePending
* @see app/Http/Controllers/POSController.php:114
* @route '/pos/save-pending'
*/
savePending.url = (options?: RouteQueryOptions) => {
    return savePending.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\POSController::savePending
* @see app/Http/Controllers/POSController.php:114
* @route '/pos/save-pending'
*/
savePending.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: savePending.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\POSController::savePending
* @see app/Http/Controllers/POSController.php:114
* @route '/pos/save-pending'
*/
const savePendingForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: savePending.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\POSController::savePending
* @see app/Http/Controllers/POSController.php:114
* @route '/pos/save-pending'
*/
savePendingForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: savePending.url(options),
    method: 'post',
})

savePending.form = savePendingForm

/**
* @see \App\Http\Controllers\POSController::clearEditSession
* @see app/Http/Controllers/POSController.php:214
* @route '/pos/clear-edit-session'
*/
export const clearEditSession = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: clearEditSession.url(options),
    method: 'post',
})

clearEditSession.definition = {
    methods: ["post"],
    url: '/pos/clear-edit-session',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\POSController::clearEditSession
* @see app/Http/Controllers/POSController.php:214
* @route '/pos/clear-edit-session'
*/
clearEditSession.url = (options?: RouteQueryOptions) => {
    return clearEditSession.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\POSController::clearEditSession
* @see app/Http/Controllers/POSController.php:214
* @route '/pos/clear-edit-session'
*/
clearEditSession.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: clearEditSession.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\POSController::clearEditSession
* @see app/Http/Controllers/POSController.php:214
* @route '/pos/clear-edit-session'
*/
const clearEditSessionForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: clearEditSession.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\POSController::clearEditSession
* @see app/Http/Controllers/POSController.php:214
* @route '/pos/clear-edit-session'
*/
clearEditSessionForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: clearEditSession.url(options),
    method: 'post',
})

clearEditSession.form = clearEditSessionForm

const pos = {
    index: Object.assign(index, index),
    products: Object.assign(products, products),
    sale: Object.assign(sale, sale),
    savePending: Object.assign(savePending, savePending),
    clearEditSession: Object.assign(clearEditSession, clearEditSession),
}

export default pos