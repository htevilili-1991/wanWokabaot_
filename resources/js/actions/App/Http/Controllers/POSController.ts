import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
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
* @see \App\Http\Controllers\POSController::getProducts
* @see app/Http/Controllers/POSController.php:49
* @route '/pos/products'
*/
export const getProducts = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getProducts.url(options),
    method: 'get',
})

getProducts.definition = {
    methods: ["get","head"],
    url: '/pos/products',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\POSController::getProducts
* @see app/Http/Controllers/POSController.php:49
* @route '/pos/products'
*/
getProducts.url = (options?: RouteQueryOptions) => {
    return getProducts.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\POSController::getProducts
* @see app/Http/Controllers/POSController.php:49
* @route '/pos/products'
*/
getProducts.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getProducts.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\POSController::getProducts
* @see app/Http/Controllers/POSController.php:49
* @route '/pos/products'
*/
getProducts.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getProducts.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\POSController::getProducts
* @see app/Http/Controllers/POSController.php:49
* @route '/pos/products'
*/
const getProductsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getProducts.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\POSController::getProducts
* @see app/Http/Controllers/POSController.php:49
* @route '/pos/products'
*/
getProductsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getProducts.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\POSController::getProducts
* @see app/Http/Controllers/POSController.php:49
* @route '/pos/products'
*/
getProductsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getProducts.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

getProducts.form = getProductsForm

/**
* @see \App\Http\Controllers\POSController::processSale
* @see app/Http/Controllers/POSController.php:69
* @route '/pos/sale'
*/
export const processSale = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: processSale.url(options),
    method: 'post',
})

processSale.definition = {
    methods: ["post"],
    url: '/pos/sale',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\POSController::processSale
* @see app/Http/Controllers/POSController.php:69
* @route '/pos/sale'
*/
processSale.url = (options?: RouteQueryOptions) => {
    return processSale.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\POSController::processSale
* @see app/Http/Controllers/POSController.php:69
* @route '/pos/sale'
*/
processSale.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: processSale.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\POSController::processSale
* @see app/Http/Controllers/POSController.php:69
* @route '/pos/sale'
*/
const processSaleForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: processSale.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\POSController::processSale
* @see app/Http/Controllers/POSController.php:69
* @route '/pos/sale'
*/
processSaleForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: processSale.url(options),
    method: 'post',
})

processSale.form = processSaleForm

/**
* @see \App\Http\Controllers\POSController::savePendingSale
* @see app/Http/Controllers/POSController.php:114
* @route '/pos/save-pending'
*/
export const savePendingSale = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: savePendingSale.url(options),
    method: 'post',
})

savePendingSale.definition = {
    methods: ["post"],
    url: '/pos/save-pending',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\POSController::savePendingSale
* @see app/Http/Controllers/POSController.php:114
* @route '/pos/save-pending'
*/
savePendingSale.url = (options?: RouteQueryOptions) => {
    return savePendingSale.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\POSController::savePendingSale
* @see app/Http/Controllers/POSController.php:114
* @route '/pos/save-pending'
*/
savePendingSale.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: savePendingSale.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\POSController::savePendingSale
* @see app/Http/Controllers/POSController.php:114
* @route '/pos/save-pending'
*/
const savePendingSaleForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: savePendingSale.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\POSController::savePendingSale
* @see app/Http/Controllers/POSController.php:114
* @route '/pos/save-pending'
*/
savePendingSaleForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: savePendingSale.url(options),
    method: 'post',
})

savePendingSale.form = savePendingSaleForm

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

const POSController = { index, getProducts, processSale, savePendingSale, clearEditSession }

export default POSController