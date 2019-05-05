/**
 * Created by victor on 2017/9/28.
 */

import {Toast} from 'antd-mobile'
const globelApiErrHandler = store => next => action => {
    const { type, payload, error } = action
    if (error) {
        console.warn('Wrong From Action:',type);
        console.log(payload.get('code'))
        if (payload.get('code')) {
            if (payload.get('code') === 'invalid login'){
                Toast.loading('正在加载');
            }else {
                Toast.info(payload.get('message'));
            }
        } else {
            Toast.loading('正在加载', 3);
        }
        return
    }
    next(action)
}

export default [
    globelApiErrHandler
]