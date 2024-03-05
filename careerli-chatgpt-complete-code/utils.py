import json

def param_check(params_provided: list, params_required: list) -> bool or list:
    """
    Check weather provided params are correct or not.

    Parameters
    ----------
    params_provided : list
        params received from user.
    params_required : list
        params required.

    Returns
    -------
    bool or list
        Return True if params_provided are correct.
        Return Error (str) if params_provided are not correct.

    """
    err = []
    params_required.insert(0, 'toolType')
    for provided in params_provided:
        if provided not in params_required:
            err += [
                f"Invalid parameter: '{provided}'"
            ]
    if len(err):
        err.append(f'Note: parameters are case sensitive.')

        return {
            'statusCode': 400,
            'headers': {
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': '*'
            },
            'body': json.dumps(
                {
                    "Error": err,
                    "Required Parameters": params_required
                }
            )
        }
    return True
