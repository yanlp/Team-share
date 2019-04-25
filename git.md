# Git 学习总结

## 1.Git基础

### 1.1 获取git仓库的方法

* 对现有工作目录启用`git`项目管理使用`git init`命令初始化，出现`.git`的目录，所有 Git 需要的数据和资源都存放在这个目录中。（此时只是对预做版本控制的项目做了，结构框架的初始化工作）。

```javascript
// 后续需要对需要做版本控制的文件做如下操作
git add *.C  // 添加预加入版本控制的文件

git commit -m "init project manage" // 添加修改文件到暂存区域的信息说明

git push  // push到远程仓库
```

* 从现有仓库克隆源码，具体命令格式`git clone [url]`

```javascript
`git clone git://github.com/schacon/grit.git [rename]`// 本地创建一个命名为[rename]或grit的工作目录
```

### 1.2 记录更新仓库的状态

对于现有工作目录的文件跟踪分为如下两类：已跟踪和未跟踪。

* 已跟踪: 已经纳入到版本控制的文件，在上次快照中有这些文件的记录，经过一段时间的工作后，其状态可分为：未更新、已修改、已放入暂存区域。
* 未跟踪: 未在上次快照记录中，且不在当前暂存区域。

具体状态更新图如下
![img](/git-status-process.png)

---
检查文件状态基本命令

* 有文件本修改的状态

``` javascript
    // 当前分支
    // 1、已跟踪文件 git.md 已修改但未放到暂存区域
    // 2、未跟踪文件 git-status-process.png 文件
    git status
    On branch versionChange
    Your branch is up-to-date with 'origin/versionChange'.

    Changes not staged for commit:
    (use "git add <file>..." to update what will be committed)
    (use "git checkout -- <file>..." to discard changes in working directory)

        modified:   git.md

    Untracked files:
    (use "git add <file>..." to include in what will be committed)

        git-status-process.png

    no changes added to commit (use "git add" and/or "git commit -a")
```

* 工作目录无修改文件

```javascript
    git status
    On branch master
    nothing to commit, working directory clean
```

---
添加新的被跟踪文件

* 使用命令`git add filename|*|.`

```javascript
git add git-status-process.png

// 此时，git-status-process.png被跟踪，并添加到暂存区域
git status
On branch versionChange
Your branch is up-to-date with 'origin/versionChange'.

Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

	new file:   git-status-process.png
```

---
更新已跟踪并被修改的文件

```javascript
git add git.md
// 此时，git-status-process.png被跟踪，并添加到暂存区域
git status
On branch versionChange
Your branch is up-to-date with 'origin/versionChange'.

Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

	new file:   git-status-process.png
```
