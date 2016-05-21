
//异步函数
export async function searchLiveRoom(keyword,page){
    
    return new Promise((success,error)=>{
        $.ajax({
            type : 'GET',
            url  : '/zhanqi/'+keyword+'?page='+page,
            success : function(response){
                success(response)
            },
            error : function(xhr){
                error('请求失败')
            }
        });
    })
}