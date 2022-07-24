---
title: 设计模式之七大设计原则
date: 2020-05-29
---

# 结构型设计模式之代理模式

> 参考博客（其中视频是看的尚硅谷 B 站视频）

> ()[https://www.cnblogs.com/clover-toeic/p/11715583.html]

## 概念

给目标对象提供一个替身或者占位符以==控制==对这个对象的访问。

注意：最后还是**访问的是目标对象的方法**。

## 静态代理

代理对象和目标对象都实现相同的接口，代理对象的构造函数中传入目标对象。

![image-20220603184120440](https://dyimgstorage-1304967922.cos.ap-nanjing.myqcloud.com/mdimg/image-20220603184120440.png)

### 代码

#### ITeacherDao

```java
//接口
public interface ITeacherDao {
	void teach(); // 授课的方法
}

```

#### TeacherDao

```java
public class TeacherDao implements ITeacherDao {
	@Override
	public void teach() {
		System.out.println(" 老师授课中  。。。。。");
	}
}
```

#### TeacherDaoProxy

```java
//代理对象,静态代理
public class TeacherDaoProxy implements ITeacherDao{
	private ITeacherDao target; // 目标对象，通过接口来聚合
	//构造器
	public TeacherDaoProxy(ITeacherDao target) {
		this.target = target;
	}
	@Override
	public void teach() {
		System.out.println("开始代理  完成某些操作。。。。。 ");
		target.teach();
		System.out.println("提交。。。。。");
	}
}
```

#### 优缺点

- 优点：在不修改目标对象的功能前提下,能通过代理对象对目标功能扩展

- 缺点：
  - 因为代理对象需要与目标对象实现一样的接口,所以会有很多代理类
  - 一旦接口增加方法,目标对象与代理对象都要维护

## 动态代理

#### 介绍

- 代理对象,不需要实现接口，但是目标对象要实现接口，否则不能用动态代理
- 代理对象的生成，是利用 JDK 的 API，**动态**的在内存中构建代理对象
- 动态代理也叫做：JDK 代理、接口代理

主要使用==proxy==对象中的==newProxyInstance==方法

```java
Proxy.newProxyInstance(ClassLoader loader,Class<?>[] interfaces,InvocationHandler h)
```

#### 自定义 InvocationHandler 类

不用内部类方式写代码的时候，==一定要聚合目标对象==。

```java
package proxy.proxy.dynamic;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;

/**
 * @author NIDAYANG
 * @ClassName CustomInvocationHandler
 * @Description
 * @Date 2022/6/3 18:47
 * @Version 1.0.0
 **/
public class CustomInvocationHandler implements InvocationHandler {

    private Object tartget;

    public CustomInvocationHandler(Object tartget) {
        this.tartget = tartget;
    }
    @Override
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
        System.out.println("JDK代理开始~~");
        //反射机制调用目标对象的方法
        Object returnVal = method.invoke(tartget, args);
        System.out.println("JDK代理提交");
        return returnVal;
    }
}

```

## cglib 代理

#### 介绍

- 静态代理和 JDK 代理模式都要求目标对象是实现一个接口,但是有时候目标对象只是一个单独的对象,并没有实现任何的接口,这个时候可使用目标对象子类来实现代理-这就是 Cglib 代理
- Cglib 代理也叫作子类代理,它是在内存中构建一个子类对象从而实现对目标对象功能扩展,有些书也将 Cglib 代理归属到动态代理
- Cglib 是一个强大的高性能的代码生成包,它可以在运行期扩展 java 类与实现 java 接口.它广泛的被许多 AOP 的框架使用,例如 SpringAOP，实现方法拦截
- 在 AOP 编程中如何选择代理模式：
  - 目标对象需要实现接口，用 JDK 代理
  - 目标对象不需要实现接口，用 Cglib 代理
- Cglib 包的底层是通过使用**字节码处理框架 ASM**来转换字节码并生成新的类

#### 优点

==**没有实现接口的对象也能被代理。**==

#### 代码

代理工厂代码，需要通过调用 cglib 中的**Enhancer 类**来创建对象。

```java
package proxy.proxy.cglib;

import java.lang.reflect.Method;

import net.sf.cglib.proxy.Enhancer;
import net.sf.cglib.proxy.MethodInterceptor;
import net.sf.cglib.proxy.MethodProxy;

public class ProxyFactory implements MethodInterceptor {

	//维护一个目标对象
	private Object target;

	//构造器，传入一个被代理的对象
	public ProxyFactory(Object target) {
		this.target = target;
	}

	//返回一个代理对象:  是 target 对象的代理对象
	public Object getProxyInstance() {
		//1. 创建一个工具类
		Enhancer enhancer = new Enhancer();
		//2. 设置父类
		enhancer.setSuperclass(target.getClass());
		//3. 设置回调函数
		enhancer.setCallback(this);
		//4. 创建子类对象，即代理对象
		return enhancer.create();

	}

	//重写  intercept 方法，会调用目标对象的方法
	@Override
	public Object intercept(Object arg0, Method method, Object[] args, MethodProxy arg3) throws Throwable {
		// TODO Auto-generated method stub
		System.out.println("Cglib代理模式 ~~ 开始");
		Object returnVal = method.invoke(target, args);
		System.out.println("Cglib代理模式 ~~ 提交");
		return returnVal;
	}
}
```
