 /* 描述: 底部footer模板
 *  作者: Jack Chen
 *  日期: 2020-08-02
 */

import * as React from 'react';
import '@/styles/footer.less';

export default class Footer extends React.Component {
    render () {
        return (
            <div className="footer-container">
                <div className="footer">
                    <div className="copyright">
                        Copyright@2021-2025 HNU Blockchain Lab1 湘BBC备7758612号01
                    </div>
                </div>
            </div>
        )
    }
}