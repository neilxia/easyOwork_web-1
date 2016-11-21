{
  "header": {
    "requestId": "12345678900987654321123456789009",
    "timeStamp": "20160918080808",
    "applicationId": "ezKompany-work",
    "ip": "127.0.0.1",
    "tokenId": "3k9LL9eDxq5WeKFBRTPX2b5j6hWOurm4",
    "entId": "00000006"
  },
  "body": {
    "status": {
      "statusCode": "0"
    },
    "data": {
      "processDefList": [
        {
          "name": "报销测试",
          "description": "报销测试描述",
          "userDTOList": [],
          "roleDTOList": [
            {
              "name": "行政"
            },
            {
              "name": "项目部1"
            },
            {
              "name": "项目部2"
            },
            {
              "name": "销售"
            },
            {
              "name": "人力资源"
            }
          ],
          "processDefStepDTOList": [
            {
              "stepName": "STEP1",
              "stepNo": 1,
              "userDTO": {
                "id": "00004",
                "orgList": [],
                "roleList": [],
                "salaryTypeList": [],
                "socialSecurityList": [],
                "failCount": 0,
                "name": "LCQ",
                "personalEmail": "luochangqing@qinghuiyang.com",
                "personalPhone": "18428396582",
                "personalPhoneCountryCode": "86",
                "birthDate": null,
                "joiningDate": null,
                "locked": false,
                "active": false,
                "identified": true
              },
              "end": false
            },
            {
              "stepName": "STEP2",
              "stepNo": 2,
              "userDTO": {
                "id": "00004",
                "orgList": [],
                "roleList": [],
                "salaryTypeList": [],
                "socialSecurityList": [],
                "failCount": 0,
                "name": "LCQ",
                "personalEmail": "luochangqing@qinghuiyang.com",
                "personalPhone": "18428396582",
                "personalPhoneCountryCode": "86",
                "birthDate": null,
                "joiningDate": null,
                "locked": false,
                "active": false,
                "identified": true
              },
              "end": false
            },
            {
              "stepName": "STEP3",
              "stepNo": 3,
              "userDTO": {
                "id": "00004",
                "orgList": [],
                "roleList": [],
                "salaryTypeList": [],
                "socialSecurityList": [],
                "failCount": 0,
                "name": "LCQ",
                "personalEmail": "luochangqing@qinghuiyang.com",
                "personalPhone": "18428396582",
                "personalPhoneCountryCode": "86",
                "birthDate": null,
                "joiningDate": null,
                "locked": false,
                "active": false,
                "identified": true
              },
              "end": false
            }
          ],
          "processDefFieldDTOList": [
            {
              "name": "FIELD1",
              "seqNo": 1,
              "type": "TEXT",
              "length": 40,
              "defaultValue": "",
              "mandatory": true
            },
            {
              "name": "FIELD2",
              "seqNo": 2,
              "type": "NUMBER",
              "length": 40,
              "defaultValue": "",
              "mandatory": true
            },
            {
              "name": "FIELD3",
              "seqNo": 3,
              "type": "TEXTAREA",
              "length": 400,
              "defaultValue": "",
              "mandatory": true
            }
          ]
        },
        {
          "name": "报销",
          "description": "报销流程",
          "userDTOList": [],
          "roleDTOList": [],
          "processDefStepDTOList": [
            {
              "stepName": "第一级审批",
              "stepNo": 1,
              "userDTO": {
                "orgList": [],
                "roleList": [],
                "salaryTypeList": [],
                "socialSecurityList": [],
                "failCount": 0,
                "name": "敬兴悦",
                "personalEmail": "luochangqing@outlook.com",
                "personalPhone": "13908172896",
                "personalPhoneCountryCode": "86",
                "birthDate": null,
                "joiningDate": null,
                "locked": false,
                "active": false,
                "identified": true
              },
              "end": false
            },
            {
              "stepName": "第二级审批",
              "stepNo": 2,
              "userDTO": {
                "orgList": [],
                "roleList": [],
                "salaryTypeList": [],
                "socialSecurityList": [],
                "failCount": 0,
                "name": "敬兴悦",
                "personalEmail": "luochangqing@outlook.com",
                "personalPhone": "13908172896",
                "personalPhoneCountryCode": "86",
                "birthDate": null,
                "joiningDate": null,
                "locked": false,
                "active": false,
                "identified": true
              },
              "end": false
            },
            {
              "stepName": "第三级审批",
              "stepNo": 3,
              "userDTO": {
                "orgList": [],
                "roleList": [],
                "salaryTypeList": [],
                "socialSecurityList": [],
                "failCount": 0,
                "name": "敬兴悦",
                "personalEmail": "luochangqing@outlook.com",
                "personalPhone": "13908172896",
                "personalPhoneCountryCode": "86",
                "birthDate": null,
                "joiningDate": null,
                "locked": false,
                "active": false,
                "identified": true
              },
              "end": false
            }
          ],
          "processDefFieldDTOList": [
            {
              "name": "报销名称",
              "seqNo": 1,
              "type": "TEXT",
              "length": 40,
              "defaultValue": "",
              "mandatory": false
            },
            {
              "name": "报销金额",
              "seqNo": 2,
              "type": "TEXT",
              "length": 40,
              "defaultValue": "",
              "mandatory": false
            },
            {
              "name": "原因",
              "seqNo": 3,
              "type": "TEXT",
              "length": 40,
              "defaultValue": "",
              "mandatory": false
            }
          ]
        }
      ]
    }
  }
}