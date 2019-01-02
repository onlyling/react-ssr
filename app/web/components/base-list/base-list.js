import React from 'react';
import { getParamBySearchString, parseObject2search, getPager } from '@Utils';

class Node extends React.Component {
    /**
     * 表单数据
     */
    $__QueryData__ = {};

    /**
     * 是否是函数操作的，避免链接的进入，导致 $__QueryData__ 与 search 不同步
     */
    $isAction = false;

    /**
     * 后去通用的分页组件配置
     */
    $getPager = (data) => {
        let self = this;
        return getPager(data, (page) => {
            if (page == 1) {
                // 可能是洁癖在作祟
                page = '';
            }
            self.$putQueryData('pageNo', page);
        });
    };

    /**
     * 获取表单数据
     */
    $getQueryData = (key) => {
        if (key) {
            return this.$__QueryData__[key] || '';
        } else {
            return this.$__QueryData__;
        }
    };

    /**
     * 修改表单数据 同时更新 URL
     */
    $putQueryData = (key, value) => {
        this.$isAction = true;
        if (value) {
            this.$__QueryData__[key] = value;
        } else {
            if (Object.prototype.toString.call(key) === '[object Object]') {
                Object.keys(key).forEach((k) => {
                    if (key[k]) {
                        this.$__QueryData__[k] = key[k];
                    } else {
                        delete this.$__QueryData__[k];
                    }
                });
            } else {
                delete this.$__QueryData__[key];
            }
        }
        // 修改 URL
        let { history } = this.props;
        history.push(`${history.location.pathname}${parseObject2search(this.$__QueryData__)}`);
    };

    /**
     * 初始化表单数据 刷新页面恢复已选表单数据
     */
    $initQueryData = () => {
        let { search } = this.props.location;
        let data = getParamBySearchString(search);
        this.$__QueryData__ = data;
    };

    /**
     * 更新的时候初始化页面、重新获取数据
     */
    componentDidUpdate(prevProps) {
        if (
            this.props.location.search !== prevProps.location.search ||
            this.props.match.url !== prevProps.match.url
        ) {
            if (!this.$isAction) {
                // 不是函数操作，更新
                this.$initQueryData();
            }
            this.$initPage && this.$initPage();
            this.$isAction = false;
        }
    }
}

export default Node;
