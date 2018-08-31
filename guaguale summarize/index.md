>  Sublime Text3 Package Control 在菜单栏中不显示

## 前言

* 最近由于在 Sublime Text3 下配置了React 开发环境，最近也更新了Sublime Text3 的版本，由此装上了很多的插件。今天打开Sublime 想要通过 `Package Control` 装个东西，一看 `Package Control` 不见了。

## 解决问题
```
    在 `C:\Users\*****\AppData\Roaming\Sublime Text 3\Packages\User` 目录下有个 `Preferences.sublime-settings` 文件，内容为
    
    {
    "color_scheme": "Packages/Babel/Monokai Phoenix.tmTheme",
    "font_size": 14,
    "ignored_packages":
    [
        "Vintage",
        "Package Control"
    ],
    "word_wrap": true
    }
    
    
    
    看到有个 `ignored_packages` 这一项的 `Package Control` 去掉，问题得易解决。
    
    修改后的内容：
    
    {
    "color_scheme": "Packages/Babel/Monokai Phoenix.tmTheme",
    "font_size": 14,
    "ignored_packages":
    [
        "Vintage"
    ],
    "word_wrap": true
    }


```