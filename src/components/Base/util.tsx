import Operate from './Opreate';


/**
 * 通用table
 */
export default  class BaseTableListUtil {
    static createRow (action: string, title: string, columns: any) {
        let result
        let cols: { name: string; label: string; rules: { required: boolean; message: string; }[]; }[] = []
        columns.forEach((element: {dataIndex: string; title: string}) => {
          if (element)
              if (element.dataIndex && element.title) {
                if (element.title !== '操作') {
                  let col = {
                    name: element.dataIndex,
                    label: element.title + '',
                    rules: [{ required: element.title === '商户号' || element.title === '商户名称', message: '请输入' + element.title }]
                  }
                  cols.push(col)
                }
              }
          });
          console.log('createRow', cols)
          result = {
            cols: cols,
            title: action === Operate.Update ? '编辑' + title : '新增' + title,
            action: action
          }
        return result
    }
}
