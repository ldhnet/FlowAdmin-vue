// import { FormatDisplayUtils } from '@/utils/formatdisplay_data'
import { approveList,hrbpOptions } from '@/utils/flow/const'
const isEmptyArray = data => Array.isArray(data) ? data.length === 0 : true

export class FormatDisplayUtils {
    /**
     * 格式化显示数据
     * @param {Array} parmData 
     * @returns Object
     */
    static getToTree(parmData) {           
        let node = this.createNodeDisplay(parmData); 
        let formatList = this.formatDisplayStructNodeList(parmData.nodes);    
        node.nodeConfig = this.depthConverterToTree(formatList);//parmData.nodes
        return node;
    }

    /**
     * 创建Node Data 数据
     * @param { Object } nodeData - 源节点数据
     * @returns Object
     */
    static createNodeDisplay(nodeData) {
 
       let displayObj = {
            tableId: nodeData.id,
            bpmnCode: nodeData.bpmnCode,
            bpmnName: nodeData.bpmnName, //name 改成 bpmnName 其他的都是添加的
            bpmnType: nodeData.bpmnType,
            formCode:nodeData.formCode,
            appId: nodeData.appId,
            deduplicationType: nodeData.deduplicationType,//2去重,1不去重
            effectiveStatus:  nodeData.effectiveStatus == 1?true:false,
            remark: "合同审批",
            isDel: 0,
            directorMaxLevel: 3, 
            nodeConfig: {},
        } 
        return displayObj
    }
    /**
     * List 转成tree结构
     * @param {Array} parmData 
     * @returns 
     */
    static depthConverterToTree(parmData) {
        if (isEmptyArray(parmData)) return
        let nodesGroup = {}, startNode = {}
        for (let t of parmData) {
            if (nodesGroup.hasOwnProperty(t.nodeFrom)) {
                nodesGroup[t.nodeFrom].push(t)
            } else {
                nodesGroup[t.nodeFrom] = [t]
            }
        }
        for (let node of parmData) {
            if (1 == node.nodeType) {
                startNode = node;
            }
            Object.assign(node, { conditionNodes: [] });
            let currNodeId = node.nodeId;
            if (nodesGroup.hasOwnProperty(currNodeId)) {
                let itemNodes = nodesGroup[currNodeId];
                for (let itemNode of itemNodes) {
                    if (3 == itemNode.nodeType) {
                        node.conditionNodes.push(itemNode);
                    } else {
                        node.childNode = itemNode;
                    }
                }
            }
        }
        return startNode
    }

    static formatDisplayStructNodeList(nodeList) {
        if (isEmptyArray(nodeList)) return nodeList;
        for (let node of nodeList) {    
    
            if (node.nodeType == 3) {
                node.priorityLevel = node.property.sort;
                node.isDefault = node.property.isDefault;
                Object.assign(node, { conditionList: [] });
                node.conditionList  =  node.property.conditionList ? node.property.conditionList : [];  
                delete node.property;
            }

            if (node.nodeType == 4 || node.nodeType == 5) {
                let empList = [];       
                if (node.property && !isEmptyArray(node.property.emplIds)) {
                    if(node.nodeProperty == 6){
                        for (let emplId of node.property.emplIds) {
                            let approveObj = {
                                type: 6,
                                targetId: parseInt(emplId),
                                name: hrbpOptions.find(item => item.value == emplId)?.label 
                            };
                            empList.push(approveObj);
                        }
                    }
                    if (node.nodeProperty == 5) {
                        for (let emplId of node.property.emplIds) {
                            let approveObj = {
                                type: 5,
                                targetId: parseInt(emplId),
                                name: approveList[emplId]
                            };
                            empList.push(approveObj);
                        }
                    }
                    Object.assign(node, { signType: node.property.signType });
                }
                node.setType = node.nodeProperty; 
                Object.assign(node, { nodeApproveList: [] });
 
                node.nodeApproveList = empList;
                delete node.property;
            }
        }
        return nodeList;
    }
}