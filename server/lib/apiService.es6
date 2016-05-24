import env from '../../env'

const api_url = {

    searchPandaLiveRoom: env.host_panda + '/ajax_search',

    searchHuyaLiveRoom: env.host_huya,

    searchDouyuLiveRoom: env.host_douyu,

    searchBiliLiveRoom: env.host_bili + '/search/index',

    searchZhanqiLiveRoom: env.host_zhanqi + '/search'
};

export default api_url