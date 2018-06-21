---

title: Setting Up Your JAMstack from Scratch
author: Aaron Autrand
image: /img/blog/24042754923_4bfba6cc51_z.jpg
image_caption: "Photo by [Lotus Carroll](https://www.flickr.com/photos/thelotuscarroll)"
format: blog
short_title: Setting Up Your JAMstack
description: "Get your production machine ready for JAMstack development"
thumbnail: thumbnails/24042754923_4bfba6cc51_q.jpg
cmsUserSlug: ""
date: 2016-06-07T00:00:00.000Z
tags:
  - JAMstack
  - NodeJS
  - Ruby
  - Python
  - CLI
---

So you've heard about the JAMstack for front-end development, and have been convinced that this is the best way to develop and host sites and applications. But how do you get started?

Here at Netlify, we realize that not everyone is a JAMstack developer (yet). So if you are at a loss as to how to get started, we're here to help.

<!-- excerpt -->

What follows is a super basic starting place for brand new JAMstack developers. You'll learn how to set up your tools, find applications that make your life easier, and even a few tricks that the pros use.

# Setting Up Your Production Machine

While many of the tools that you can use to develop come pre-installed on your computer, there are others that are more niche, or alternatives to the existing software that are miles beyond factory default.

## The Terminal

Now that you've started developing, the terminal is going to be your best friend. For certain tools, there will be GUI options, but familiarity with the terminal will save you headaches and heartache in both the short and long run.

If you are a Linux user, you are probably already familiar with the command line, and your distro comes with a terminal built in. OSX users also have a terminal built in, but around our office, most of us use [iTerm](https://www.iterm2.com/). It's a bit more customizable and flexible, and that makes us happy.

Windows users have access to a command line interface out of the box, but for development it is kind of a garbage fire. That's why most Windows web devs ditch it for [Cygwin](https://www.cygwin.com/).

Working in the command line can be daunting, but Lifehacker has a great guide for [beginners](http://lifehacker.com/5633909/who-needs-a-mouse-learn-to-use-the-command-line-for-almost-anything), as well as tips and tricks to turn you into a [command line ninja](http://lifehacker.com/5743814/become-a-command-line-ninja-with-these-time-saving-shortcuts).

## Package Managers

**OSX:** [Homebrew](http://brew.sh/) bills itself as "the missing package manager for Mac". It installs the stuff you need that Apple didn't. Many of the tools below can be installed individually, but often there's also `brew install` command that will allow you to install everything with the necessary dependencies. It will cut down on major headaches. To install Homebrew, paste this into a terminal prompt:

```
$ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

**Windows:** Windows users have been left in the dark for a long time when it comes to package management, but thanks to [OneGet](https://github.com/OneGet/oneget) and [Chocolatey](https://chocolatey.org/), that's no longer the case. How-To Geek has a great article on [getting started with OneGet](http://www.howtogeek.com/224111/how-to-use-packagemanagement-aka-oneget-on-windows-10/) that's worth a read.

**Linux:** Linux users have a built-in package manager. Debian-based systems use `apt-get`, Fedora uses `yum` and anyone using some other distro is probably already intimately familiar with the exact command they need to use.

## Git

In the old days, web developers would log in to an FTP server and upload their work, which often led to problems, especially if there were multiple contributors to a site. Then version control systems like Git were embraced by those in the know and began to gain critical mass. Git allows multiple people to contribute changes to files or projects by tracking different versions, comparing changes, and allowing individual developers to propose changes without breaking things via pull requests. Git is an absolute necessity, so here's how to install it:

**OSX:** There are several ways to install Git on a OSX. The easiest is to install the Xcode Command Line Tools. On Mavericks (10.9) or above you can do this simply by trying to run `git` from the Terminal the very first time. If you don’t have it installed already, it will prompt you to install it.

If you want a more up to date version, you can also install it via a binary installer. An OSX Git installer is maintained and available for download at the Git website, at [http://git-scm.com/download/OSX](http://git-scm.com/download/OSX).

**Windows:** Go to [http://git-scm.com/download/win](http://git-scm.com/download/win) and the download will start automatically.

**Linux:** You can install git via your package management system

On Fedora you can use yum:

```
$ sudo yum install git-all
```

If you’re on a Debian-based distribution like Ubuntu, try apt-get:

```
$ sudo apt-get install git-all
```

For more options, there are instructions for installing on several different Unix flavors on the Git website, at [http://git-scm.com/download/linux](http://git-scm.com/download/win).

## Remote Git Repositories

Once you've got Git set up, you'll need somewhere to host your projects. There are lots of options, but we'll cover the three that Netlify plays nicely with.

[GitHub](https://github.com/): The grandaddy. GitHub is the most popular and world’s largest code hosting site, and gives unlimited public code repositories to all users. Netlify uses GitHub for all our projects, including this site. GitHub also has a OSX and Windows app for developers who would rather use a GUI. [Get started with GitHub](https://help.github.com/articles/set-up-git/).

[Bitbucket](https://bitbucket.org/): Bitbucket bills itself as distributed version control system for teams, and the only collaborative git solution that massively scales. Free public and private repos for up to five users. [Get started with Bitbucket](https://confluence.atlassian.com/bitbucket/tutorial-learn-git-with-bitbucket-cloud-759857287.html).

[GitLab](https://about.gitlab.com/): GitLab offers unlimited public and private repos hosted on its server. Additionally, it offers GitLab CE (Community Edition) and GitLab EE (Enterprise Edition), which you can host on your own server. [Get started with GitLab](https://about.gitlab.com/2014/02/26/getting-started-with-gitlab/).

## Text Editor/Code Editor

It's completely possible to use the standard text editor that comes with every computer to develop, but the majority of developers look for something with a little more oomph.

[Sublime Text](http://www.sublimetext.com/) wasn't the first powered-up text editor, but it definitely set the bar for everything to come. It has color coding, customizable themes, and myriad plugins. While the app costs $70, you can evaluate it for as long as you'd like.

[Atom](http://atom.io) is open source and developed by GitHub. Atom is the text editor of choice for most members of team Netlify, thanks to GitHub integration, native support for Markdown, and a growing library of plugins and themes from both GitHub and the community at large.

# Gathering Your Tools

While there are a ton of Static Site Generators (check out the growing list at [StaticGen](http://www.staticgen.com)) built in a number of different languages, we've found that most of the JAM stack-friendly ones are built with one of three tools: NodeJS, Ruby or Python. While you don't need all three, you may find that there ends up being a lot of crossover, so here's how to install them straight off the bat:

# NodeJS

You can install NodeJS directly at [https://nodejs.org](https://nodejs.org). But we suggest you don't.

Why? Because different tools play nice with different versions of Node. That's why we prefer to use Node with [NVM (Node Version Manager)](https://github.com/creationix/nvm). NVM allows you to install multiple versions of Node, specify which version you want to use, and change versions on the fly. Additionally with NVM, you don't need to use `sudo` to install node modules globally. So that's nice.

**OSX** or **Linux:** To install or update nvm, you can use the install script using cURL:

```
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.1/install.sh | bash
```

or Wget:

```
wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.31.1/install.sh | bash
```

The script clones the nvm repository to ~/.nvm and adds the source line to your profile (~/.bash_profile, ~/.zshrc, ~/.profile, or ~/.bashrc).

**Windows:** NVM doesn't support Windows, but there are two alternatives (which are not supported by NVM's creators):
[nvm-windows](https://github.com/coreybutler/nvm-windows)
[nodist](https://github.com/marcelklehr/nodist)

Using NVM: To install the latest version of node with NVM, enter the following in your terminal:

```
nvm install 5.0
```
And then in any new shell just use the installed version:

```
nvm use 5.0
```

## Ruby
As with NodeJS, there are multiple ways to install Ruby. We'll leave the arguments about what is best to the Redditors and StackEdit experts, and tell you how we choose to do it at Netlify - with rbenv. By using rbenv, you can manage various versions of Ruby on a project-by-project basis.

**OSX:** Even the creators of rbenv just suggest using Homebrew:

```
$ brew install rbenv ruby-install
```
If you don't want to use Homebrew, you can follow the Linux installation instructions below. If you do so, replace instances of `~/.bashrc` with `~/.bash_profile`. Otherwise, jump down to [Installing Ruby with rbenv](#rubyinstall).

**Linux:** Installing rbenv is a multi-step process. We'll try to make it as easy to follow as possible.

Install the various dependencies you need for Ruby and rbenv:

```
sudo apt-get install git-core curl zlib1g-dev build-essential libssl-dev libreadline-dev libyaml-dev libsqlite3-dev sqlite3 libxml2-dev libxslt1-dev libcurl4-openssl-dev python-software-properties libffi-dev
```

Clone the rbenv repository to `/.rbenv`

```
$ git clone https://github.com/rbenv/rbenv.git ~/.rbenv
```

Add `~/.rbenv/bin` to your `$PATH`

```
$ echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.bashrc
```

Open a new terminal tab and install the `ruby-build` plugin, which will make it easier to install different versions of Ruby in the future

```
$ git clone https://github.com/rbenv/ruby-build.git ~/.rbenv/plugins/ruby-build
```

**Installing Ruby with rbenv** <a name="rubyinstall"></a>

To install a Ruby version for use with rbenv, run rbenv install with the exact name of the version you want to install

```
$ rbenv install 2.2.0
```

**Windows:** There is no rbenv for Windows. To install Ruby on Windows, use [Ruby Installer](http://rubyinstaller.org/).

### Install Bundler
Bundler allows you to install gems with their dependencies. It will make your ruby-loving life much easier

```
$ gem install Bundler
```

## Python

[Python](https://www.python.org) is another extremely popular language in the front-end development game. We suggest installing Python along with `virtualenv`, which allows you to create siloed virtual environments for your projects.

**OSX:** Homebrew is the easiest way to install Python. It will install `setuptools` and `pip` for you

```
$ brew install python
```

**Linux:** Most modern distros come with Python installed out of the box. To verify that you have the proper version installed, run

```
$ python --version
```
You want at least Python 2.7.

You'll then want to install `pip`. The following command will also install `setuptools`

```
$ python get-pip.py
```

**Windows:** Python is installable as a .msi package in Windows. Get it in the [Windows section](https://www.python.org/downloads/) of Python's downloads.

Install `setuptools` by downloading [ez_setup.py](https://bootstrap.pypa.io/ez_setup.py) and running the script.

Install `pip` by downloading [get-pip.py](https://bootstrap.pypa.io/get-pip.py) and running the script.

### Install virtualenv
Installing Python on its own is a recipe for headaches if you have multiple Python-based projects. That's why you want to install Python projects in a virtual environment.

```
$ pip install virtualenv
```

To use a virtual environment, create it with the following command

```
$ virtualenv /PATH/TO/my_project_environment
```

Then change to the environment you just created

```
$ cd /PATH/TO/my_project_environment
```

And activate it

```
$ source bin/activate
```

Your command prompt will change, which indicates you are in the virtual environment.

# Bash Profile Tips and Tricks

Now that you've got most everything installed, we've got a few suggestions to make your development life a tad easier. Most of these are platform-agnostic, but we'll spell out differences for the different OSes if necessary.

**Git Aware Prompt:** Once you get into using Git, you'll become familiar with branches and merging. You can make your terminal display your current branch, as well as the current status of your work (whether or not you've committed changes) by installing [git-aware-prompt](https://github.com/jimeh/git-aware-prompt).

Clone the project to a `.bash` folder in your home directory:

```
$ mkdir ~/.bash
$ cd ~/.bash
$ git clone git://github.com/jimeh/git-aware-prompt.git
```
Edit your `~/.bash_profile` or `~/.profile` or `~/.bashrc` (for Ubuntu) and add the following to the top:

```
export GITAWAREPROMPT=~/.bash/git-aware-prompt
source "${GITAWAREPROMPT}/main.sh"
```
You can then add colors and more with the following prompts, pasted into the bottom of your Bash file -- `~/.bash_profile` or `~/.profile` or `~/.bashrc` (for Ubuntu)

**Mac OS X:**

```
export PS1="\u@\h \W \[$txtcyn\]\$git_branch\[$txtred\]\$git_dirty\[$txtrst\]\$ "
```
Optionally, if you want a nice pretty prompt when using sudo -s, also add this line:

```
export SUDO_PS1="\[$bakred\]\u@\h\[$txtrst\] \w\$ "
```
**Ubuntu:**

Standard:

```
export PS1="\${debian_chroot:+(\$debian_chroot)}\u@\h:\w \[$txtcyn\]\$git_branch\[$txtred\]\$git_dirty\[$txtrst\]\$ "
```
Colorized:

```
export PS1="\${debian_chroot:+(\$debian_chroot)}\[\033[01;32m\]\u@\h\[\033[00m\]:\[\033[01;34m\]\w\[\033[00m\] \[$txtcyn\]\$git_branch\[$txtred\]\$git_dirty\[$txtrst\]\$ "
```

**Git-specific Terminal Aliases**
Git commands can get repetitive almost immediately. Thankfully, you can add Aliases to your Bash profile. Aliases will allow you to create shortcuts for commands you use often. Below are the git-specific shortcuts that many of us use at Netlify. Open your Bash profile in your favorite text editor (`~/.bash_profile` or `~/.profile` or `~/.bashrc` (for Ubuntu)) and paste the following into the body:

```
alias del='git branch -d '
alias gb='git branch '
alias gba='git branch -a '

alias gc-='git checkout -'
alias gc='git checkout'
alias gcm='git checkout master'
alias gco='git checkout '
alias gd='git diff | mate'
alias gg='git grep'
alias gitamend='git commit --amend'
alias gitignore='vim .gitignore'

alias gpl='git pull'
alias gpom="git pull origin master"
alias grv='git remote -v'
alias gst='git status'
```

Now restart your terminal, and revel in the power at your fingertips. For more terminal tips and timesavers, we highly suggest Lifehacker's [Become a Command Line Ninja With These Time-Saving Shortcuts](http://lifehacker.com/5743814/become-a-command-line-ninja-with-these-time-saving-shortcuts), and, as always, Google is your friend.

# Using Netlify

Obviously, we have some skin in this game. Netlify was created by developers, for developers. And we are convinced that when it comes to front-end development, Netlify is the best choice choice for hosting you can make. Connect us to your git repo, and any time you push changes, we'll rebuild your site. It's as easy as that. Now you don't have to worry about hours-long setup, you can just focus on building the stuff that's important to you, and we'll take care of the rest.
