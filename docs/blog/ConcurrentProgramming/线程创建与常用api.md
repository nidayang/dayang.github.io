# [二]线程创建与常用api

> 学习黑马程序员并发编程juc

## java创建线程的三种方式

### 使用匿名内部类

```java
package com.dayang.thread.create;

import lombok.extern.slf4j.Slf4j;

/**
 * @author NIDAYANG
 * @ClassName Create01
 * @Description
 * @Date 2022/5/16 12:45
 * @Version 1.0.0
 **/
@Slf4j
public class Create01 {
    public static void main(String[] args) {

        Thread thread = new Thread(){
            public void run() {
                log.debug("输出一条记录");
            }
        };
        thread.start();
    }
}

```

编译后会有俩个class文件，其中Thread的匿名内部类如下

![image-20220516193547970](https://dyimgstorage-1304967922.cos.ap-nanjing.myqcloud.com/mdimg/image-20220516193547970.png)

```java
package com.dayang.thread.create;

import org.slf4j.Logger;
static class Create01$1 extends Thread
{

	public void run()
	{
		Create01.access$000().debug("输出一条记录");
	}

	Create01$1()
	{
	}
}
```

### 实现runnable接口

```java
package com.dayang.thread.create;

import lombok.extern.slf4j.Slf4j;

/**
 * @author NIDAYANG
 * @ClassName Create01
 * @Description
 * @Date 2022/5/16 12:45
 * @Version 1.0.0
 **/
@Slf4j
public class Create02 {
    public static void main(String[] args) {

        Thread thread = new Thread(new Runnable() {
            @Override
            public void run() {
                log.debug("打印一条信息");
            }
        });
        thread.start();
        log.info("主线程打印一条记录");
    }
}

```

编译后俩个class文件，其中有一个实现了runnable接口的内部类

```java
package com.dayang.thread.create;

import org.slf4j.Logger;

// Referenced classes of package com.dayang.thread.create:
//			Create02

static class Create02$1
	implements Runnable
{

	public void run()
	{
		Create02.access$000().debug("打印一条信息");
	}

	Create02$1()
	{
	}
```

### 实例化FutureTask对象创建线程

创建一个任务对象，主线程会等待被创建线程的执行

```java
package com.dayang.thread.create;

import lombok.extern.slf4j.Slf4j;

import java.util.concurrent.ExecutionException;
import java.util.concurrent.FutureTask;

/**
 * @author NIDAYANG
 * @ClassName Create03
 * @Description
 * @Date 2022/5/16 19:48
 * @Version 1.0.0
 **/
@Slf4j
public class Create03 {
    public static void main(String[] args) throws ExecutionException, InterruptedException {
        // 创建任务对象
        FutureTask<Integer> task3 = new FutureTask<>(() -> {
            log.info("hello");
            return 100;
        });
        // 参数1 是任务对象; 参数2 是线程名字，推荐
        new Thread(task3, "t3").start();
        // 主线程阻塞，同步等待 task 执行完毕的结果
        Integer result = task3.get();
        log.info("结果是:{}", result);
    }
}
```

## 线程级别的查看方式

### windows 

- 任务管理器可以查看进程和线程数，也可以用来杀死进程 
- tasklist 查看进程 
- taskkill 杀死进程 

### linux 

- ps -fe 查看所有进程 
- ps -fT -p  查看某个进程（PID）的所有线程 
- kill 杀死进程 top 按大写 H 切换是否显示线程 
- top -H -p  查看某个进程（PID）的所有线程 

### Java 

- jps 命令查看所有 Java 进程 
- jstack  查看某个 Java 进程（PID）的所有线程状态 
- jconsole 来查看某个 Java 进程中线程的运行情况（图形界面）

## 常用api

### run()与start（）

- run方法实际上还是主线程在执行代码，而start方法才是创建一个新的线程执行代码
- 调用start方法之前线程的状态是new状态，调用之后是runnable状态

```java
package com.dayang.thread.basicapi;

import lombok.extern.slf4j.Slf4j;

import java.io.FileReader;

/**
 * @author NIDAYANG
 * @ClassName Runtest
 * @Description
 * @Date 2022/5/16 20:12
 * @Version 1.0.0
 **/
@Slf4j
public class Runtest {
    public static void main(String[] args) {
        Thread t1 = new Thread("t1") {
            @Override
            public void run() {
                log.debug(Thread.currentThread().getName());
            }
        };
        t1.run();
        log.debug("do other things ...");
    }
}

```

```java
package com.dayang.thread.basicapi;

import lombok.extern.slf4j.Slf4j;

/**
 * @author NIDAYANG
 * @ClassName Runtest
 * @Description
 * @Date 2022/5/16 20:12
 * @Version 1.0.0
 **/
@Slf4j
public class Starttest {
    public static void main(String[] args) {
        Thread t1 = new Thread("t1") {
            @Override
            public void run() {
                log.debug(Thread.currentThread().getName());
            }
        };
        t1.start();
        log.debug("do other things ...");
    }
}

```

```java
package com.dayang.thread.basicapi;

import lombok.extern.slf4j.Slf4j;

@Slf4j(topic = "c.Test5")
public class StartTest01 {

    public static void main(String[] args) {
        Thread t1 = new Thread("t1") {
            @Override
            public void run() {
                log.debug("running...");
            }
        };

        System.out.println(t1.getState());
        t1.start();
        System.out.println(t1.getState());
    }
}

```

### sleep()方法与yield()方法

> yield: 让步的意思

#### sleep

- 调用 sleep 会让当前线程从 Running 进入 Timed Waiting 状态（阻塞） 
- 其它线程可以使用 interrupt 方法打断正在睡眠的线程，这时 sleep 方法会抛出 InterruptedException 
- 睡眠结束后的线程未必会立刻得到执行 
- 建议用 TimeUnit 的 sleep 代替 Thread 的 sleep 来获得更好的可读性

#### yield 

1. 调用 yield 会让当前线程从 Running 进入 Runnable 就绪状态，然后调度执行其它线程 
1. 具体的实现依赖于操作系统的任务调度器

```java
package com.dayang.thread.basicapi;

/**
 * @author NIDAYANG
 * @ClassName YieldTest
 * @Description
 * @Date 2022/5/16 20:35
 * @Version 1.0.0
 **/
public class YieldTest {
    public static void main(String[] args) {
        Runnable task1 = () -> {
            int count = 0;
            for (;;) {
                System.out.println("---->1 " + count++);
            }
        };
        Runnable task2 = () -> {
            int count = 0;
            for (;;) {
                //Thread.yield();
                System.out.println("              ---->2 " + count++);
            }
        };
        Thread t1 = new Thread(task1, "t1");
        Thread t2 = new Thread(task2, "t2");
        t1.setPriority(Thread.MIN_PRIORITY);
        t2.setPriority(Thread.MAX_PRIORITY);
        t1.start();
        t2.start();
    }
}
```

### 线程优先级

- 线程优先级会提示（hint）调度器优先调度该线程，但它仅仅是一个提示，调度器可以忽略它

操作系统调度线程是有他的章法的，**只是提醒操作系统**

- **如果 cpu 比较忙，那么优先级高的线程会获得更多的时间片，但 cpu 闲时，优先级几乎没作用**
