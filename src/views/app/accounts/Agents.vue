<template>
    <el-table :data="tableData" style="width: 100%">
        <el-table-column label="Level" prop="level" width="70" align="center" />
        <el-table-column label="Username" prop="username" width="120" align="center">
            <template #="{ row }">
                <div class="flex">
                    <span class="flex-1">{{ row.username }}</span>
                    <el-button link>
                        <el-icon>
                            <IconEpCopyDocument />
                        </el-icon>
                    </el-button>
                </div>
            </template>
        </el-table-column>
        <el-table-column label="Name" prop="name" />
        <el-table-column label="Upline" prop="upline" width="120" align="center">
            <template #="{ row }">
                <el-link type="primary" :underline="false">
                    {{ row.upline }}
                </el-link>
            </template>
        </el-table-column>
        <el-table-column label="Last Activity Time" width="180">
            <template #="{ row }">
                <div style="display: flex; align-items: center">
                    <el-icon><IconEpTimer /></el-icon>
                    <span style="margin-left: 10px">{{ row.date }}</span>
                </div>
            </template>
        </el-table-column>
        <el-table-column label="Currency" prop="currency" width="90" align="center">
            <template #="{ row }">
                <el-tag type="warning" effect="plain">
                    {{ row.currency }}
                </el-tag>
            </template>
        </el-table-column>
        <el-table-column label="Balance" prop="balance" width="180" align="right">
            <template #="{ row }">
                {{ row.balance.toLocaleString() }}
            </template>
        </el-table-column>
        <el-table-column label="Status" prop="status" width="90" align="center">
            <template #="{ row }">
                <el-text size="small" class="w-full" effect="plain" :type="statusTagLabel[row.status].tagType">
                    {{ statusTagLabel[row.status].label }}
                </el-text>
            </template>
        </el-table-column>
        <el-table-column label="Downline" align="center">
            <el-table-column label="Agent" prop="downline.agents" align="center" width="70" />
            <el-table-column label="Players" prop="downline.players" align="center" width="75" />
        </el-table-column>

        <el-table-column label="Operations" align="center" fixed="right" width="320">
            <!-- <el-table-column label="System" width="110" align="center">
                <template #default="scope">
                    <el-button plain circle type="warning" @click="handleEdit(scope.$index, scope.row)">
                        <template #icon>
                            <el-tooltip content="Edit" placement="left" :hide-after="50"><IconEpEditPen /></el-tooltip>
                        </template>
                    </el-button>
                    <el-button plain circle type="danger" @click="handleEdit(scope.$index, scope.row)">
                        <template #icon>
                            <el-tooltip content="Delete" placement="right" :hide-after="50"
                                ><IconEpDelete
                            /></el-tooltip>
                        </template>
                    </el-button>
                </template>
            </el-table-column>
            <el-table-column label="Finance" align="center" fixed="right" width="140">
                <el-button link size="small" type="success">Deposit</el-button>
                <el-button link size="small" type="danger">Withdraw</el-button>
            </el-table-column> -->
            <template #default="{ $index, row }">
                <el-button size="small" type="primary" @click="handleEdit($index, row)">Edit</el-button>

                <el-button size="small" type="success">Deposit</el-button>
                <el-button size="small" type="danger">Withdraw</el-button>
                <el-button size="small" type="danger" plain :icon="Delete" @click="handleDelete($index, row)"
                    >Delete</el-button
                >
            </template>
        </el-table-column>
    </el-table>
</template>

<script lang="ts" setup>
import { Delete } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

enum UserStatus {
    DISABLED = 0,
    ENABLED = 1,
    DELETED = 2
}

type StatusTagLabel = Record<
    string,
    {
        tagType: '' | 'info' | 'success' | 'danger' | 'warning' | 'primary'
        label: string
    }
>

const statusTagLabel: StatusTagLabel = {
    [UserStatus.DISABLED]: {
        tagType: 'info',
        label: 'Disabled'
    },
    [UserStatus.ENABLED]: {
        tagType: 'success',
        label: 'Enabled'
    },
    [UserStatus.DELETED]: {
        tagType: 'danger',
        label: 'Deleted'
    }
}

interface User {
    level: number
    upline: string
    username: string
    date: string
    name: string
    currency: string
    balance: number | string
    status: UserStatus
    downline: {
        agents: number
        players: number
    }
}

const handleEdit = (index: number, row: User) => {
    console.log(index, row)
    ElMessage(`${row.balance}, ${index}`)
}
const handleDelete = (index: number, row: User) => {
    console.log(index, row)
}

const tableData: User[] = [
    {
        level: 1,
        date: '2016-05-03 15:24',
        upline: 'HNW825',
        username: 'HNW900',
        name: 'Tom',
        currency: 'IDR',
        balance: 918873007.95,
        status: UserStatus.DISABLED,
        downline: {
            agents: 2,
            players: 0
        }
    },
    {
        level: 1,
        date: '2016-05-02 20:54',
        upline: 'VIP161',
        username: 'VIP162',
        name: 'Tom',
        currency: 'IDR',
        balance: 12900000,
        status: UserStatus.ENABLED,
        downline: {
            agents: 1,
            players: 0
        }
    },
    {
        level: 1,
        date: '2016-05-04 12:19',
        upline: 'TES725',
        username: 'TES800',
        name: 'Tom',
        currency: 'IDR',
        balance: 74900.45,
        status: UserStatus.DELETED,
        downline: {
            agents: 1,
            players: 1
        }
    },
    {
        level: 1,
        date: '2016-05-01 20:59',
        upline: 'TES161',
        username: 'TES162',
        name: 'Tom',
        currency: 'IDR',
        balance: 100,
        status: UserStatus.ENABLED,
        downline: {
            agents: 1,
            players: 0
        }
    }
]

onMounted(async () => {
    const response = await request.get('/agent/list?level=1')

    console.log(response)
})
</script>
