import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\DividendController::approve
* @see app/Http/Controllers/DividendController.php:137
* @route '/dividend-calculations/{calculation}/approve'
*/
export const approve = (args: { calculation: number | { id: number } } | [calculation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: approve.url(args, options),
    method: 'post',
})

approve.definition = {
    methods: ["post"],
    url: '/dividend-calculations/{calculation}/approve',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\DividendController::approve
* @see app/Http/Controllers/DividendController.php:137
* @route '/dividend-calculations/{calculation}/approve'
*/
approve.url = (args: { calculation: number | { id: number } } | [calculation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { calculation: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { calculation: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            calculation: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        calculation: typeof args.calculation === 'object'
        ? args.calculation.id
        : args.calculation,
    }

    return approve.definition.url
            .replace('{calculation}', parsedArgs.calculation.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DividendController::approve
* @see app/Http/Controllers/DividendController.php:137
* @route '/dividend-calculations/{calculation}/approve'
*/
approve.post = (args: { calculation: number | { id: number } } | [calculation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: approve.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\DividendController::approve
* @see app/Http/Controllers/DividendController.php:137
* @route '/dividend-calculations/{calculation}/approve'
*/
const approveForm = (args: { calculation: number | { id: number } } | [calculation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: approve.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\DividendController::approve
* @see app/Http/Controllers/DividendController.php:137
* @route '/dividend-calculations/{calculation}/approve'
*/
approveForm.post = (args: { calculation: number | { id: number } } | [calculation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: approve.url(args, options),
    method: 'post',
})

approve.form = approveForm

/**
* @see \App\Http\Controllers\DividendController::pay
* @see app/Http/Controllers/DividendController.php:148
* @route '/dividend-calculations/{calculation}/pay'
*/
export const pay = (args: { calculation: number | { id: number } } | [calculation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: pay.url(args, options),
    method: 'post',
})

pay.definition = {
    methods: ["post"],
    url: '/dividend-calculations/{calculation}/pay',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\DividendController::pay
* @see app/Http/Controllers/DividendController.php:148
* @route '/dividend-calculations/{calculation}/pay'
*/
pay.url = (args: { calculation: number | { id: number } } | [calculation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { calculation: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { calculation: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            calculation: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        calculation: typeof args.calculation === 'object'
        ? args.calculation.id
        : args.calculation,
    }

    return pay.definition.url
            .replace('{calculation}', parsedArgs.calculation.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DividendController::pay
* @see app/Http/Controllers/DividendController.php:148
* @route '/dividend-calculations/{calculation}/pay'
*/
pay.post = (args: { calculation: number | { id: number } } | [calculation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: pay.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\DividendController::pay
* @see app/Http/Controllers/DividendController.php:148
* @route '/dividend-calculations/{calculation}/pay'
*/
const payForm = (args: { calculation: number | { id: number } } | [calculation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: pay.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\DividendController::pay
* @see app/Http/Controllers/DividendController.php:148
* @route '/dividend-calculations/{calculation}/pay'
*/
payForm.post = (args: { calculation: number | { id: number } } | [calculation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: pay.url(args, options),
    method: 'post',
})

pay.form = payForm

const dividendCalculations = {
    approve: Object.assign(approve, approve),
    pay: Object.assign(pay, pay),
}

export default dividendCalculations